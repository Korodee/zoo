import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose from "mongoose";
import { User } from "../models/User";
import { AgeCategory } from "../models/AgeCategory";
import { sendEmail } from "../config/mailer";
import {
  verifyEmailTemplate,
  resetPasswordTemplate,
  welcomeEmailTemplate,
} from "../templates/emailTemplates";

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication and account management
 */
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         name:
 *           type: string
 *         is_member:
 *           type: boolean
 *         is_verified:
 *           type: boolean
 *         membership_date:
 *           type: string
 *           format: date-time
 *       required: [id, email, is_member, is_verified]
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 */
const router = express.Router();

// Typed JWT helper to avoid overload confusion
const JWT_SECRET = process.env.JWT_SECRET as unknown as jwt.Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const signJwt = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);

const generateToken = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

// Register user with optional name and email verification token
/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user and send verification email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */
router.post("/auth/register", async (req, res) => {
  try {
    const { email, password, name, date_of_birth } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email et mot de passe requis" });

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ error: "L'utilisateur existe déjà" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = generateToken(24);

    // Compute age if dob provided
    let dobDate: Date | undefined = undefined;
    let ageYears: number | undefined = undefined;
    if (date_of_birth) {
      const parsed = new Date(date_of_birth);
      if (!isNaN(parsed.getTime())) {
        dobDate = parsed;
        const now = new Date();
        let age = now.getFullYear() - parsed.getFullYear();
        const m = now.getMonth() - parsed.getMonth();
        if (m < 0 || (m === 0 && now.getDate() < parsed.getDate())) age--;
        ageYears = Math.max(0, Math.min(130, age));
      }
    }

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: typeof name === "string" ? name.trim() : undefined,
      date_of_birth: dobDate,
      age_years: ageYears,
      is_member: false,
      is_verified: false,
      email_verification_token: verificationToken,
      email_verification_expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    // If we have a valid age, increment the AgeCategory counter and compute remaining
    let spots = undefined as undefined | { sold: number; cap: number; remaining: number; unlocked: boolean };
    if (typeof ageYears === "number") {
      const doc = await AgeCategory.findOneAndUpdate(
        { age_years: ageYears },
        { $setOnInsert: { cap: 5000 }, $inc: { count: 1 } },
        { new: true, upsert: true }
      );
      if (doc) {
        if (!doc.unlocked && doc.count >= doc.cap) {
          doc.unlocked = true;
          await doc.save();
        }
        spots = {
          sold: doc.count,
          cap: doc.cap,
          remaining: Math.max(0, doc.cap - doc.count),
          unlocked: doc.unlocked,
        };
      }
    }

    const verifyUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/verify-email?token=${verificationToken}&email=${encodeURIComponent(
      user.email
    )}`;
    const emailResult = await sendEmail({
      to: user.email,
      subject: "Vérifiez votre email • Domaine du Chevreuil Blanc",
      html: verifyEmailTemplate({ name: user.name || undefined, verifyUrl }),
    });

    const token = signJwt({ userId: user._id, email: user.email });

    res
      .status(201)
      .json({
        message: emailResult.ok
          ? "Utilisateur créé. Email de vérification envoyé."
          : "Utilisateur créé, mais l'email de vérification n'a pas pu être envoyé.",
        emailSent: emailResult.ok,
        ...(emailResult.error ? { emailError: emailResult.error } : {}),
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name || "",
          age_years: user.age_years,
          is_member: user.is_member,
          is_verified: user.is_verified,
        },
        spots,
      });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Échec de la création de l'utilisateur" });
  }
});

// Verify email
/**
 * @openapi
 * /api/auth/verify-email:
 *   post:
 *     tags: [Auth]
 *     summary: Verify a user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, email]
 *             properties:
 *               token:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */
router.post("/auth/verify-email", async (req, res) => {
  try {
    const { token, email } = req.body;
    if (!email)
      return res.status(400).json({ error: "Token et email requis" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(400).json({ error: "Token invalide ou expiré" });

    // Idempotent: if already verified, respond success
    if (user.is_verified)
      return res.json({ message: "Email vérifié avec succès" });

    if (!token || user.email_verification_token !== token) {
      return res.status(400).json({ error: "Token invalide ou expiré" });
    }
    if (
      user.email_verification_expires &&
      user.email_verification_expires < new Date()
    ) {
      return res.status(400).json({ error: "Token expiré" });
    }

    user.is_verified = true;
    user.email_verification_token = undefined;
    user.email_verification_expires = undefined;
    await user.save();

    const paymentUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/payment`;
    const welcomeResult = await sendEmail({
      to: user.email,
      subject: "Bienvenue au Domaine du Chevreuil Blanc 🦌",
      html: welcomeEmailTemplate({ name: user.name || undefined, paymentUrl }),
    });
    if (!welcomeResult.ok) {
      console.error("Failed to send welcome email:", welcomeResult.error);
    }

    res.json({ message: "Email vérifié avec succès" });
  } catch (e) {
    console.error("Verify email error:", e);
    res.status(500).json({ error: "Échec de la vérification de l'email" });
  }
});

// Login user
/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Email not verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email et mot de passe requis" });

    // Check database connection
    if (mongoose.connection.readyState !== 1) {
      console.error("Database not connected, readyState:", mongoose.connection.readyState);
      return res.status(503).json({ error: "Database connection unavailable" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Identifiants invalides" });

    // Enforce verified email
    if (!user.is_verified)
      return res
        .status(403)
        .json({
          error:
            "Email non vérifié. Veuillez vérifier votre email avant de vous connecter.",
        });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Identifiants invalides" });

    const token = signJwt({ userId: user._id, email: user.email });

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || "",
        is_member: user.is_member,
        is_verified: user.is_verified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Échec de la connexion" });
  }
});

// Resend verification email
/**
 * @openapi
 * /api/auth/resend-verification:
 *   post:
 *     tags: [Auth]
 *     summary: Resend verification email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Message indicating result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post("/auth/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email requis" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.json({
        message: "Si un compte existe, un lien de vérification a été envoyé.",
      });
    if (user.is_verified)
      return res.json({ message: "Email déjà vérifié" });

    const verificationToken = crypto.randomBytes(24).toString("hex");
    user.email_verification_token = verificationToken;
    user.email_verification_expires = new Date(
      Date.now() + 1000 * 60 * 60 * 24
    );
    await user.save();

    const verifyUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/verify-email?token=${verificationToken}&email=${encodeURIComponent(
      user.email
    )}`;
    const emailResult = await sendEmail({
      to: user.email,
      subject: "Vérifiez votre email • Domaine du Chevreuil Blanc",
      html: verifyEmailTemplate({ name: user.name || undefined, verifyUrl }),
    });

    if (!emailResult.ok) {
      return res.status(502).json({
        error: "Impossible d'envoyer l'email de vérification.",
        emailError: emailResult.error,
      });
    }

    res.json({ message: "Email de vérification envoyé" });
  } catch (e) {
    console.error("Resend verification error:", e);
    res.status(500).json({ error: "Échec de l'envoi de l'email de vérification" });
  }
});

// Request password reset
/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     tags: [Auth]
 *     summary: Request a password reset email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Message indicating result
 *       500:
 *         description: Server error
 */
router.post("/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email requis" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.json({
        message: "If an account exists, a reset link was sent.",
      });

    const resetToken = generateToken(24);
    user.reset_password_token = resetToken;
    user.reset_password_expires = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/reset-password?token=${resetToken}&email=${encodeURIComponent(
      user.email
    )}`;
    const emailResult = await sendEmail({
      to: user.email,
      subject: "Réinitialiser votre mot de passe • Domaine du Chevreuil Blanc",
      html: resetPasswordTemplate({ name: user.name || undefined, resetUrl }),
    });

    if (!emailResult.ok) {
      console.error("Forgot password email failed:", emailResult.error);
    }

    res.json({ message: "Si un compte existe, un lien de réinitialisation a été envoyé." });
  } catch (e) {
    console.error("Forgot password error:", e);
    res.status(500).json({ error: "Échec de l'initiation de la réinitialisation" });
  }
});

// Reset password
/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Reset password using a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, email, newPassword]
 *             properties:
 *               token:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid or expired token
 *       500:
 *         description: Server error
 */
router.post("/auth/reset-password", async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;
    if (!token || !email || !newPassword)
      return res
        .status(400)
        .json({ error: "Token, email et nouveau mot de passe requis" });

    const user = await User.findOne({
      email: email.toLowerCase(),
      reset_password_token: token,
    });
    if (!user)
      return res.status(400).json({ error: "Token invalide ou expiré" });
    if (user.reset_password_expires && user.reset_password_expires < new Date())
      return res.status(400).json({ error: "Token expiré" });

    user.password = await bcrypt.hash(newPassword, 12);
    user.reset_password_token = undefined;
    user.reset_password_expires = undefined;
    await user.save();

    res.json({ message: "Mot de passe réinitialisé" });
  } catch (e) {
    console.error("Reset password error:", e);
    res.status(500).json({ error: "Échec de la réinitialisation du mot de passe" });
  }
});

// Logout user (client-side token removal)
/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Client-side logout (no server state)
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/auth/logout", async (_req, res) => {
  try {
    res.json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Échec de la déconnexion" });
  }
});

export default router;
