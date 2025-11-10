import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

export type AuthProvider = "local" | "google";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Index({ unique: true })
    @Column({ type: "varchar", length: 190, nullable: true })
    email!: string | null;

    @Column({ type: "varchar", length: 100, nullable: true })
    name!: string | null;

    @Column({ type: "varchar", length: 255, nullable: true, select: false })
    passwordHash!: string | null;

    @Column({ type: "varchar", length: 20, default: "local" })
    provider!: AuthProvider;

    @Index()
    @Column({ type: "varchar", length: 190, nullable: true })
    providerId!: string | null;

    @Column({ type: "boolean", default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
