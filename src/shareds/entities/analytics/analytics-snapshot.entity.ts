import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../shareds/entities/base.entity";
import {UserEntity} from "../auth";
import {ProjectEntity} from "../project";

@Entity({ name: "analytics_snapshots" })
export class AnalyticsSnapshotEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (u) => u.analyticsSnapshots)
    user!: UserEntity;

    @ManyToOne(() => ProjectEntity, { nullable: true })
    project?: ProjectEntity;

    @Column({ name: "period_type", length: 10 })
    periodType!: "daily" | "weekly" | "monthly";

    @Column({ name: "period_start", type: "date" })
    periodStart!: string;

    @Column({ name: "period_end", type: "date" })
    periodEnd!: string;

    @Column({ name: "metrics_json", type: "jsonb" })
    metricsJson!: object;
}
