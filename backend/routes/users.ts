import express from "express";
import { User } from "../models/User";
import { authenticateToken } from "../middleware/auth";

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User profile and membership
 */
const router = express.Router();

// Get user profile
/**
 * @openapi
 * /api/users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get the current user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get("/users/profile", authenticateToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Check membership status
/**
 * @openapi
 * /api/users/membership:
 *   get:
 *     tags: [Users]
 *     summary: Get membership status for the current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Membership status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 is_member:
 *                   type: boolean
 *                 membership_date:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get("/users/membership", authenticateToken, async (req: any, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "is_member membership_date"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      is_member: user.is_member,
      membership_date: user.membership_date,
    });
  } catch (error) {
    console.error("Error checking membership:", error);
    res.status(500).json({ error: "Failed to check membership status" });
  }
});

export default router;
