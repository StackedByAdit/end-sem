import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ENV from "./utils/config";

export interface AuthRequest extends Request {
  userId?: number;
}

export interface JwtPayload {
  userId: number;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const payload = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
