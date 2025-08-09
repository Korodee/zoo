import express from "express";
import Stripe from "stripe";
import { User } from "../models/User";

/**
 * @openapi
 * tags:
 *   - name: Payments
 *     description: Stripe checkout and webhooks
 */
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

// Create checkout session
/**
 * @openapi
 * /api/create-checkout-session:
 *   post:
 *     tags: [Payments]
 *     summary: Create a Stripe Checkout session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, email]
 *             properties:
 *               userId:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Session created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessionId:
 *                   type: string
 *                 url:
 *                   type: string
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Server error
 */
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!userId || !email) {
      return res.status(400).json({ error: "User ID and email are required" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "WildLife Hub Membership",
              description:
                "Access to exclusive wildlife photography contests and content",
              images: [
                "https://images.unsplash.com/photo-1557050543-4d5f2e07c5b9?w=400&h=300&fit=crop",
              ],
            },
            unit_amount: 1999, // $19.99
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`,
      customer_email: email,
      metadata: {
        userId: userId,
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Handle webhook
/**
 * @openapi
 * /api/webhook:
 *   post:
 *     tags: [Payments]
 *     summary: Stripe webhook endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Acknowledged
 *       400:
 *         description: Signature verification failed
 */
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;

        try {
          // Update user's membership status in MongoDB
          const updatedUser = await User.findByIdAndUpdate(
            session.metadata?.userId,
            {
              is_member: true,
              membership_date: new Date(),
              updated_at: new Date(),
            },
            { new: true }
          );

          if (!updatedUser) {
            console.error("User not found:", session.metadata?.userId);
            return res
              .status(500)
              .json({ error: "Failed to update membership" });
          }

          console.log(
            "Membership activated for user:",
            session.metadata?.userId
          );
        } catch (error) {
          console.error("Error processing webhook:", error);
          return res.status(500).json({ error: "Failed to process webhook" });
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  }
);

// Verify payment status
/**
 * @openapi
 * /api/verify-payment/{sessionId}:
 *   get:
 *     tags: [Payments]
 *     summary: Verify a Checkout session and activate membership
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Verification result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.get("/verify-payment/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      // Update user membership status
      const updatedUser = await User.findByIdAndUpdate(
        session.metadata?.userId,
        {
          is_member: true,
          membership_date: new Date(),
          updated_at: new Date(),
        },
        { new: true }
      );

      if (!updatedUser) {
        console.error("User not found:", session.metadata?.userId);
        return res.status(500).json({ error: "Failed to update membership" });
      }

      res.json({
        success: true,
        message: "Payment verified and membership activated",
      });
    } else {
      res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

export default router;
