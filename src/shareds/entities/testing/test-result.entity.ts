import { Entity, Column } from "typeorm";
import { BaseEntity } from "../../../shareds/entities/base.entity";

@Entity({ name: "test_results" })
export class TestResultEntity extends BaseEntity {
    @Column({ length: 50 })
    module!: string;

    @Column({ length: 10 })
    status!: "success" | "failed" | "pending";

    @Column({ type: "text", nullable: true })
    logs?: string;

    @Column({ name: "executed_at", type: "timestamptz" })
    executedAt!: Date;
}
