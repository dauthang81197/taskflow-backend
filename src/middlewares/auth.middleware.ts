import { Request, Response, NextFunction } from "express";
import { verifyAccess } from "../utils/jwt";

export function requireAuth(req: Request & { user?: any }, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ success: false, message: "Unauthorized" });

    const token = header.slice(7);
    try {
        const payload = verifyAccess(token);
        req.user = { id: payload.sub, email: payload.email };
        next();
    } catch (e) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}
