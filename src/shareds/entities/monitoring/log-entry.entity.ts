import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "log_entries" })
export class LogEntryEntity {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ length: 10 })
    level!: string;

    @Column({ type: "text" })
    message!: string;

    @Column({ name: "meta_json", type: "jsonb", nullable: true })
    metaJson?: object;

    @Column({ name: "created_at", type: "timestamptz", default: () => "now()" })
    createdAt!: Date;
}
