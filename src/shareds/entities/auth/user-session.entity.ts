import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../shareds/entities/base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "user_sessions" })
export class UserSessionEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (u) => u.sessions)
    user!: UserEntity;

    @Column({ name: "refresh_token", length: 255 })
    refreshToken!: string;

    @Column({ name: "user_agent", length: 255 })
    userAgent!: string;

    @Column({ name: "ip_address", length: 100 })
    ipAddress!: string;

    @Column({ name: "expires_at", type: "timestamptz" })
    expiresAt!: Date;
}
