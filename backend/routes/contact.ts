import express from "express";
import { sendEmail } from "../config/mailer";

/**
 * @openapi
 * tags:
 *   - name: Contact
 *     description: Contact form submissions
 */
const router = express.Router();

// Submit contact form
/**
 * @openapi
 * /api/contact:
 *   post:
 *     tags: [Contact]
 *     summary: Submit contact form
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name:
 *                 type: string
 *                 description: Contact person's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Contact person's email
 *               message:
 *                 type: string
 *                 description: Contact message
 *     responses:
 *       200:
 *         description: Contact form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: "Name, email, and message are required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: "Invalid email format" 
      });
    }

    // Log the request for debugging
    console.log("Contact form submission:", { name, email, message: message.substring(0, 50) + "..." });

    // Create email content
    const subject = `Nouveau message de contact - ${name}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Nouveau message de contact</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p style="color: #64748b; font-size: 14px;">
          Ce message a été envoyé depuis le formulaire de contact du site web Domaine du Chevreuil Blanc.
        </p>
      </div>
    `;

    // Send email to the park's email address
    try {
      await sendEmail({
        to: "koroskki@gmail.com",
        subject,
        html,
      });
      console.log("Email sent to koroskki@gmail.com");
    } catch (emailError) {
      console.error("Failed to send email to park:", emailError);
      // Continue anyway, don't fail the entire request
    }

    // Send confirmation email to the contact person
    try {
      const confirmationSubject = "Message reçu - Domaine du Chevreuil Blanc";
      const confirmationHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Message reçu</h2>
          <p>Bonjour ${name},</p>
          <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Votre message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>Merci de votre intérêt pour le Domaine du Chevreuil Blanc.</p>
          <p style="color: #64748b; font-size: 14px;">
            Cet email est envoyé automatiquement, merci de ne pas y répondre.
          </p>
        </div>
      `;

      await sendEmail({
        to: email,
        subject: confirmationSubject,
        html: confirmationHtml,
      });
      console.log("Confirmation email sent to user");
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Continue anyway, don't fail the entire request
    }

    res.json({ 
      message: "Contact form submitted successfully" 
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ 
      error: "Failed to submit contact form" 
    });
  }
});

export default router;
