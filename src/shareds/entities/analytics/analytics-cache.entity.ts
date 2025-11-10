import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../shareds/entities/base.entity";

@Entity({ name: "analytics_cache" })
export class AnalyticsCacheEntity extends BaseEntity {
    @Column({ name: "cache_key", length: 255, unique: true })
    cacheKey!: string;

    @Column({ name: "data_json", type: "jsonb" })
    dataJson!: object;

    @Column({ name: "expires_at", type: "timestamptz" })
    expiresAt!: Date;
}
