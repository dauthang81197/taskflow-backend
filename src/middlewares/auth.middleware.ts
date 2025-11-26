import { Request, Response, NextFunction } from "express";
import { AccessPayload, verifyAccess } from "../utils/jwt";
import { UserEntity } from "../shareds/entities";
export interface AccessTokenPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}
export function requireAuth(
  req: Request & { user?: Partial<UserEntity> },
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });

  const token = header.slice(7);

  try {
    const payload: AccessPayload = verifyAccess(token);

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}
