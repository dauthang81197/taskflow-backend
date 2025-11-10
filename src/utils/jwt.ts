import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { randomUUID } from "crypto";

export type AccessPayload = {
    sub: string;
    email?: string | null;
    jti: string;
    type: "access";
};

export type RefreshPayload = {
    sub: string;
    jti: string;
    type: "refresh";
};

// ✅ Sign Access Token
export function signAccessToken(userId: string, email?: string | null) {
    const jti = randomUUID();
    const payload: AccessPayload = { sub: userId, email: email ?? null, jti, type: "access" };
    const token = jwt.sign(
        payload,
        config.jwt.accessSecret,
        { expiresIn: config.jwt.accessExpires } as jwt.SignOptions
    );

    return { token, jti };
}

// ✅ Sign Refresh Token
export function signRefreshToken(userId: string) {
    const jti = randomUUID();
    const payload: RefreshPayload = { sub: userId, jti, type: "refresh" };
    const token = jwt.sign(payload, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpires } as jwt.SignOptions);
    return { token, jti };
}

// ✅ Verify Access Token
export function verifyAccess(token: string): AccessPayload {
    return jwt.verify(token, config.jwt.accessSecret) as AccessPayload;
}

// ✅ Verify Refresh Token
export function verifyRefresh(token: string): RefreshPayload {
    return jwt.verify(token, config.jwt.refreshSecret) as RefreshPayload;
}
