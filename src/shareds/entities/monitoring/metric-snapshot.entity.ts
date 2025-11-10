import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "metric_snapshots" })
export class MetricSnapshotEntity {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ name: "service_name", length: 100 })
    serviceName!: string;

    @Column({ name: "cpu_usage", type: "numeric", precision: 5, scale: 2 })
    cpuUsage!: number;

    @Column({ name: "mem_usage", type: "numeric", precision: 5, scale: 2 })
    memUsage!: number;

    @Column({ name: "request_count", type: "int" })
    requestCount!: number;

    @Column({ name: "error_count", type: "int" })
    errorCount!: number;

    @Column({ name: "created_at", type: "timestamptz", default: () => "now()" })
    createdAt!: Date;
}
