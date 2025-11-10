import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../shareds/entities/base.entity";

@Entity({ name: "email_queue" })
export class EmailQueueEntity extends BaseEntity {
    @Column({ length: 255 })
    to!: string;

    @Column({ length: 255 })
    subject!: string;

    @Column({ length: 100 })
    template!: string;

    @Column({ name: "data_json", type: "jsonb", nullable: true })
    dataJson?: object;

    @Column({ length: 20, default: "pending" })
    status!: "pending" | "sent" | "failed";
}
