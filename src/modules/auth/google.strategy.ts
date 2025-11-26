import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "../../config/env";
import { authService } from "./auth.service";
import { UserEntity } from "../../shareds/entities";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackUrl,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;
        const result = await authService.oauthLoginOrRegister(profile.id, {
          email,
          name,
        });
        done(null, { user: result.user });
      } catch (e) {
        done(e as unknown);
      }
    }
  )
);

passport.serializeUser((user: UserEntity, done) => done(null, user));
passport.deserializeUser((obj: unknown, done) => done(null, obj));

export default passport;
