import { Request, Response } from "express";
import { z } from "zod";
import { authService } from "./auth.service";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import { UserEntity } from "../../shareds/entities";
import logger from "../../config/logger";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

interface RefreshTokenPayload {
  jti: string;
  [key: string]: unknown; // nếu có thêm claims khác
}
function setRefreshCookie(res: Response, token: string) {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: "lax",
    domain: config.cookie.domain,
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export const AuthController = {
  register: async (req: Request, res: Response) => {
    const { email, password, name } = RegisterSchema.parse(req.body);
    const result = await authService.register(email, password, name);
    setRefreshCookie(res, result.refreshToken);
    res.json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = LoginSchema.parse(req.body);
    const result = await authService.login(email, password);
    setRefreshCookie(res, result.refreshToken);
    res.json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  },
  refresh: async (req: Request, res: Response) => {
    const token = req.cookies?.refresh_token as string | undefined;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Missing refresh token" });
    const result = await authService.rotateRefreshToken(token);
    setRefreshCookie(res, result.refreshToken);
    res.json({
      success: true,
      accessToken: result.accessToken,
      user: result.user,
    });
  },
  logout: async (req: Request, res: Response) => {
    const token = req.cookies?.refresh_token as string | undefined;
    if (token) {
      try {
        const payload = jwt.verify(
          token,
          config.jwt.refreshSecret
        ) as RefreshTokenPayload;
        await authService.revokeRefreshToken(payload.jti);
      } catch {
        logger.info("Error");
      }
    }
    res.clearCookie("refresh_token", {
      domain: config.cookie.domain,
      path: "/",
    });
    res.json({ success: true });
  },
  me: async (req: Request & { user?: UserEntity }, res: Response) => {
    res.json({ success: true, user: req.user });
  },
};
