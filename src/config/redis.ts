import { createClient } from "redis";
import { config } from "./env";

export const redis = createClient({ url: config.redisUrl });
redis.on("error", (err) => console.error("Redis error:", err));
redis.connect(); // fire and forget
