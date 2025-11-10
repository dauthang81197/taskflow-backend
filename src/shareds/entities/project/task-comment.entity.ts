import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {TaskEntity} from "./task.entity";
import {UserEntity} from "../auth";

@Entity({name: "task_comments"})
export class TaskCommentEntity extends BaseEntity {
    @ManyToOne(() => TaskEntity, (t) => t.comments)
    task!: TaskEntity;

    @ManyToOne(() => UserEntity)
    user!: UserEntity;

    @Column({type: "text"})
    content!: string;
}
