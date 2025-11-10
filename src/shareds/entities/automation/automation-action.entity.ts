import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {AutomationRuleEntity} from "./automation-rule.entity";

@Entity({name: "automation_actions"})
export class AutomationActionEntity extends BaseEntity {
    @ManyToOne(() => AutomationRuleEntity, (r) => r.actions)
    rule!: AutomationRuleEntity;

    @Column()
    order!: number;

    @Column({length: 50})
    type!: string;

    @Column({name: "config_json", type: "jsonb", nullable: true})
    configJson?: object;

    @Column({name: "retry_policy", type: "jsonb", nullable: true})
    retryPolicy?: object;
}
