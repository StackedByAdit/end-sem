import type { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET="thisShouldBeMySecretKey123@ABC"

export interface AuthRequest extends Request {
  userId?: number;
}

export interface JwtPayload {
    userId : number
    email : string
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const token = authHeader;

  try {
    const payload = jwt.verify(token!, JWT_SECRET) as JwtPayload;


    req.userId = payload.userId;

    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
}