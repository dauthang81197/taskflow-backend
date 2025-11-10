import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../shareds/entities/base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "oauth_accounts" })
export class OAuthAccountEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (u) => u.oauthAccounts)
    user!: UserEntity;

    @Column({ length: 50 })
    provider!: string;

    @Column({ name: "provider_id", length: 100 })
    providerId!: string;

    @Column({ name: "access_token", type: "text", nullable: true })
    accessToken?: string;

    @Column({ name: "refresh_token", type: "text", nullable: true })
    refreshToken?: string;

    @Column({ name: "expires_at", type: "timestamptz", nullable: true })
    expiresAt?: Date;
}
