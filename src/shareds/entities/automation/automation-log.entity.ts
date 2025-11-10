import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AutomationJobEntity} from "./automation-job.entity";
import {AutomationRuleEntity} from "./automation-rule.entity";

@Entity({name: "automation_logs"})
export class AutomationLogEntity {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @ManyToOne(() => AutomationJobEntity, (j) => j.logs)
    job!: AutomationJobEntity;

    @ManyToOne(() => AutomationRuleEntity)
    rule!: AutomationRuleEntity;

    @Column({type: "text"})
    message!: string;

    @Column({length: 10})
    level!: string;

    @Column({name: "data_json", type: "jsonb", nullable: true})
    dataJson?: object;

    @Column({name: "created_at", type: "timestamptz", default: () => "now()"})
    createdAt!: Date;
}
