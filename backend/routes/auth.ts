import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/User";
import { sendEmail } from "../config/mailer";
import {
  verifyEmailTemplate,
  resetPasswordTemplate,
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
    const { email, password, name } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = generateToken(24);

    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: typeof name === "string" ? name.trim() : undefined,
      is_member: false,
      is_verified: false,
      email_verification_token: verificationToken,
      email_verification_expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    const verifyUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/verify-email?token=${verificationToken}&email=${encodeURIComponent(
      user.email
    )}`;
    await sendEmail({
      to: user.email,
      subject: "Verify your email • WildLife Hub",
      html: verifyEmailTemplate({ name: user.name || undefined, verifyUrl }),
    });

    const token = signJwt({ userId: user._id, email: user.email });

    res.status(201).json({
      message: "User created. Verification email sent.",
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
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to create user" });
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
      return res.status(400).json({ error: "Token and email are required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    // Idempotent: if already verified, respond success
    if (user.is_verified)
      return res.json({ message: "Email verified successfully" });

    if (!token || user.email_verification_token !== token) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    if (
      user.email_verification_expires &&
      user.email_verification_expires < new Date()
    ) {
      return res.status(400).json({ error: "Token expired" });
    }

    user.is_verified = true;
    user.email_verification_token = null;
    user.email_verification_expires = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (e) {
    console.error("Verify email error:", e);
    res.status(500).json({ error: "Failed to verify email" });
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
      return res.status(400).json({ error: "Email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Enforce verified email
    if (!user.is_verified)
      return res.status(403).json({
        error:
          "Email not verified. Please verify your email before logging in.",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = signJwt({ userId: user._id, email: user.email });

    res.json({
      message: "Login successful",
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
    res.status(500).json({ error: "Failed to login" });
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
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.json({
        message: "If an account exists, a verification link was sent.",
      });
    if (user.is_verified)
      return res.json({ message: "Email already verified" });

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
    await sendEmail({
      to: user.email,
      subject: "Verify your email • WildLife Hub",
      html: verifyEmailTemplate({ name: user.name || undefined, verifyUrl }),
    });

    res.json({ message: "Verification email sent" });
  } catch (e) {
    console.error("Resend verification error:", e);
    res.status(500).json({ error: "Failed to resend verification email" });
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
    if (!email) return res.status(400).json({ error: "Email is required" });

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
    await sendEmail({
      to: user.email,
      subject: "Reset your password • WildLife Hub",
      html: resetPasswordTemplate({ name: user.name || undefined, resetUrl }),
    });

    res.json({ message: "If an account exists, a reset link was sent." });
  } catch (e) {
    console.error("Forgot password error:", e);
    res.status(500).json({ error: "Failed to initiate reset" });
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
        .json({ error: "Token, email and newPassword are required" });

    const user = await User.findOne({
      email: email.toLowerCase(),
      reset_password_token: token,
    });
    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });
    if (user.reset_password_expires && user.reset_password_expires < new Date())
      return res.status(400).json({ error: "Token expired" });

    user.password = await bcrypt.hash(newPassword, 12);
    user.reset_password_token = null;
    user.reset_password_expires = null;
    await user.save();

    res.json({ message: "Password has been reset" });
  } catch (e) {
    console.error("Reset password error:", e);
    res.status(500).json({ error: "Failed to reset password" });
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
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Failed to logout" });
  }
});

export default router;
