import {Entity, Column, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {AutomationActionEntity} from "./automation-action.entity";
import {AutomationJobEntity} from "./automation-job.entity";
import {UserEntity} from "../auth";

@Entity({name: "automation_rules"})
export class AutomationRuleEntity extends BaseEntity {
    @Column({length: 200})
    name!: string;

    @Column({type: "text", nullable: true})
    description?: string;

    @Column({name: "event_name", length: 100})
    eventName!: string;

    @Column({name: "condition_json", type: "jsonb", nullable: true})
    conditionJson?: object;

    @Column({name: "action_type", length: 50})
    actionType!: string;

    @Column({name: "action_data_json", type: "jsonb", nullable: true})
    actionDataJson?: object;

    @Column({default: true})
    enabled!: boolean;

    @ManyToOne(() => UserEntity, (u) => u.automationRules)
    creator!: UserEntity;

    @OneToMany(() => AutomationActionEntity, (a) => a.rule)
    actions!: AutomationActionEntity[];

    @OneToMany(() => AutomationJobEntity, (j) => j.rule)
    jobs!: AutomationJobEntity[];
}
