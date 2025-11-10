import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {TaskEntity} from "./task.entity";

@Entity({name: "task_labels"})
export class TaskLabelEntity extends BaseEntity {
    @ManyToOne(() => TaskEntity, (t) => t.labels)
    task!: TaskEntity;

    @Column({length: 50})
    name!: string;

    @Column({length: 10})
    color!: string;
}
