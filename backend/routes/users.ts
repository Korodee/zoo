import express from "express";
import { User } from "../models/User";
import mongoose from "mongoose";
import { authenticateToken } from "../middleware/auth";
import { AgeCategory } from "../models/AgeCategory";
import { apiKeyAuth } from "../middleware/apiKeyAuth";

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

// (export moved to bottom to ensure all routes are registered before export)

// Age category spots endpoint
/**
 * @openapi
 * /api/age/spots/{age}:
 *   get:
 *     tags: [Users]
 *     summary: Get remaining spots for a specific age (years)
 *     parameters:
 *       - in: path
 *         name: age
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Spots information
 *       400:
 *         description: Invalid age
 */
router.get("/age/spots/:age", async (req, res) => {
  const age = Number(req.params.age);
  if (!Number.isInteger(age) || age < 0 || age > 130) {
    return res.status(400).json({ error: "Invalid age" });
  }

  let doc = await AgeCategory.findOne({ age_years: age });
  let cap = doc?.cap ?? 5000;
  let count = doc?.count ?? 0;
  let unlocked = doc?.unlocked ?? false;

  // Fallback to live aggregation if no doc exists or count looks stale
  if (!doc) {
    count = await User.countDocuments({ age_years: age });
    unlocked = count >= cap;
  }

  res.json({ sold: count, cap, remaining: Math.max(0, cap - count), unlocked });
});

// Global registrations spots (all users)
/**
 * @openapi
 * /api/stats/spots:
 *   get:
 *     tags: [Users]
 *     summary: Get total number of registered users and remaining spots
 *     responses:
 *       200:
 *         description: Spots information (global)
 */
router.get("/stats/spots", async (_req, res) => {
  const count = await User.countDocuments({});
  const cap = 5000;
  const unlocked = count >= cap;
  res.json({ sold: count, cap, remaining: Math.max(0, cap - count), unlocked });
});

// Secure members export for Google Sheets with pagination + ETag
/**
 * @openapi
 * /api/members/sheet:
 *   get:
 *     tags: [Users]
 *     summary: Export members for Google Sheets (API key protected)
 *     description: |
 *       Returns a JSON array of members with selected fields. Use `x-api-key` header.
 *       Supports cursor-based pagination and ETag caching (304 when unchanged).
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5000
 *           default: 1000
 *       - in: query
 *         name: cursor
 *         required: false
 *         schema:
 *           type: string
 *           description: MongoDB ObjectId to paginate from (exclusive)
 *     responses:
 *       200:
 *         description: Array of members
 *         headers:
 *           ETag:
 *             schema:
 *               type: string
 *             description: Weak ETag for caching
 *           X-Next-Cursor:
 *             schema:
 *               type: string
 *             description: Present when more pages are available
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email: { type: string }
 *                   name: { type: string }
 *                   date_of_birth: { type: string, format: date-time }
 *                   age_years: { type: integer }
 *                   is_member: { type: boolean }
 *                   is_verified: { type: boolean }
 *                   membership_date: { type: string, format: date-time }
 *                   member_number: { type: string }
 *       304:
 *         description: Not Modified (ETag matched)
 *       403:
 *         description: Forbidden (invalid or missing API key)
 */
router.get("/members/sheet", apiKeyAuth as any, async (req, res) => {
  try {
    const limitRaw = Number(req.query.limit as string) || 1000;
    const limit = Math.max(1, Math.min(5000, limitRaw));
    const cursor = (req.query.cursor as string) || undefined;

    const filter: any = {};
    if (cursor) {
      try {
        filter._id = { $gt: new mongoose.Types.ObjectId(cursor) };
      } catch {}
    }

    // Compute weak ETag from total count + latest update timestamp
    const [total, latest] = await Promise.all([
      User.estimatedDocumentCount(),
      User.findOne({}, { updated_at: 1 }).sort({ updated_at: -1 }).lean(),
    ]);
    const latestIso = latest?.updated_at ? new Date(latest.updated_at).toISOString() : "0";
    const etag = `W/"${total}-${latestIso}"`;

    const clientETag = req.header("if-none-match");
    if (clientETag && clientETag === etag && !cursor) {
      res.setHeader("ETag", etag);
      return res.status(304).end();
    }

    const docs = await User.find(filter, {
      email: 1,
      name: 1,
      date_of_birth: 1,
      age_years: 1,
      is_member: 1,
      is_verified: 1,
      membership_date: 1,
      member_number: 1,
    })
      .sort({ _id: 1 })
      .limit(limit)
      .lean();

    let nextCursor: string | undefined;
    if (docs.length === limit) {
      const last = docs[docs.length - 1] as any;
      nextCursor = String(last._id);
    }

    // Set pagination + ETag headers while keeping body as clean array
    res.setHeader("ETag", etag);
    if (nextCursor) res.setHeader("X-Next-Cursor", nextCursor);
    res.setHeader("X-Page-Limit", String(limit));
    res.setHeader("Cache-Control", "no-cache");

    // Map out _id from response
    const payload = docs.map((u: any) => ({
      email: u.email,
      name: u.name,
      date_of_birth: u.date_of_birth,
      age_years: u.age_years,
      is_member: u.is_member,
      is_verified: u.is_verified,
      membership_date: u.membership_date,
      member_number: u.member_number,
    }));

    res.json(payload);
  } catch (e) {
    console.error("/members/sheet error", e);
    res.status(500).json({ error: "Failed to fetch members" });
  }
});

export default router;
