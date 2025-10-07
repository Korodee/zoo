import { Request, Response, NextFunction } from "express";

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const provided = req.header("x-api-key");
    const expected = process.env.SHEET_API_KEY?.trim();

    if (!provided || !expected || provided.trim() !== expected) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  } catch (e) {
    return res.status(403).json({ error: "Forbidden" });
  }
}

export default apiKeyAuth;


