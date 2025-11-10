import {Entity, Column, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {AutomationRuleEntity} from "./automation-rule.entity";
import {AutomationLogEntity} from "./automation-log.entity";

@Entity({name: "automation_jobs"})
export class AutomationJobEntity extends BaseEntity {
    @ManyToOne(() => AutomationRuleEntity, (r) => r.jobs)
    rule!: AutomationRuleEntity;

    @Column({name: "event_name", length: 100})
    eventName!: string;

    @Column({name: "payload_json", type: "jsonb"})
    payloadJson!: object;

    @Column({length: 20})
    status!: string;

    @Column()
    attempts!: number;

    @Column({name: "started_at", type: "timestamptz", nullable: true})
    startedAt?: Date;

    @Column({name: "finished_at", type: "timestamptz", nullable: true})
    finishedAt?: Date;

    @Column({name: "error_message", type: "text", nullable: true})
    errorMessage?: string;

    @Column({name: "worker_name", length: 50, nullable: true})
    workerName?: string;

    @OneToMany(() => AutomationLogEntity, (l) => l.job)
    logs!: AutomationLogEntity[];
}
