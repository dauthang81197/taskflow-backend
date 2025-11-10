import bcrypt from "bcrypt";
import { UserRepo } from "../user/user.repository";
import { signAccessToken, signRefreshToken, verifyRefresh } from "../../utils/jwt";
import { redis } from "../../config/redis";
import { User } from "../user/user.model";

const REFRESH_PREFIX = "refresh:";
const REFRESH_BLACKLIST = "refresh_bl:";

export class AuthService {
    async register(email: string, password: string, name?: string) {
        const existed = await UserRepo.findByEmail(email);
        if (existed) throw Object.assign(new Error("Email already registered"), { status: 409 });

        const passwordHash = await bcrypt.hash(password, 10);
        const user = UserRepo.create({ email, name: name ?? null, passwordHash, provider: "local" });
        await UserRepo.save(user);

        return this.issueTokens(user);
    }

    async login(email: string, password: string) {
        const user = await UserRepo.findWithPasswordByEmail(email);
        if (!user || !user.passwordHash) throw Object.assign(new Error("Invalid credentials"), { status: 401 });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) throw Object.assign(new Error("Invalid credentials"), { status: 401 });

        return this.issueTokens(user);
    }

    async oauthLoginOrRegister(providerId: string, profile: { email?: string; name?: string }) {
        let user = await UserRepo.findByProvider("google", providerId);
        if (!user) {
            // link by email if exists
            if (profile.email) {
                const existed = await UserRepo.findByEmail(profile.email);
                if (existed) {
                    existed.provider = "google";
                    existed.providerId = providerId;
                    user = await UserRepo.save(existed);
                }
            }
        }
        if (!user) {
            user = UserRepo.create({
                email: profile.email ?? null,
                name: profile.name ?? null,
                provider: "google",
                providerId,
            });
            await UserRepo.save(user);
        }
        return this.issueTokens(user);
    }

    private async issueTokens(user: User) {
        const { token: accessToken } = signAccessToken(user.id, user.email);
        const { token: refreshToken, jti } = signRefreshToken(user.id);

        // store refresh jti → userId (for rotation/revoke)
        await redis.set(`${REFRESH_PREFIX}${jti}`, user.id, { EX: 60 * 60 * 24 * 31 }); // ~31 days

        return { accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name } };
    }

    async rotateRefreshToken(oldToken: string) {
        const payload = verifyRefresh(oldToken);
        // check blacklist
        const blacklisted = await redis.get(`${REFRESH_BLACKLIST}${payload.jti}`);
        if (blacklisted) throw Object.assign(new Error("Refresh token revoked"), { status: 401 });

        const exists = await redis.get(`${REFRESH_PREFIX}${payload.jti}`);
        if (!exists) throw Object.assign(new Error("Refresh token invalid/expired"), { status: 401 });

        // revoke old and issue new
        await redis.del(`${REFRESH_PREFIX}${payload.jti}`);
        await redis.set(`${REFRESH_BLACKLIST}${payload.jti}`, "1", { EX: 60 * 60 * 24 * 31 });

        const user = await UserRepo.findOneByOrFail({ id: payload.sub });
        return this.issueTokens(user);
    }

    async revokeRefreshToken(jti: string) {
        await redis.del(`${REFRESH_PREFIX}${jti}`);
        await redis.set(`${REFRESH_BLACKLIST}${jti}`, "1", { EX: 60 * 60 * 24 * 31 });
    }
}

export const authService = new AuthService();
