import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {UserEntity} from "../auth";


@Entity({ name: "audit_logs" })
export class AuditLogEntity {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ name: "table_name", length: 100 })
    tableName!: string;

    @Column({ name: "record_id", type: "uuid" })
    recordId!: string;

    @Column({ length: 10 })
    action!: "insert" | "update" | "delete";

    @ManyToOne(() => UserEntity, { nullable: true })
    user?: UserEntity;

    @Column({ name: "diff_json", type: "jsonb", nullable: true })
    diffJson?: object;

    @Column({ name: "created_at", type: "timestamptz", default: () => "now()" })
    createdAt!: Date;
}
