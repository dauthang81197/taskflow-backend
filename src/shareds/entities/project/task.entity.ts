import {Entity, Column, ManyToOne, OneToMany} from "typeorm";
import {SoftDeleteEntity} from "../../../shareds/entities/soft-delete.entity";
import {TaskCommentEntity} from "./task-comment.entity";
import {TaskLabelEntity} from "./task-label.entity";
import {UserEntity} from "../auth";
import {ProjectEntity} from "./project.entity";

@Entity({name: "tasks"})
export class TaskEntity extends SoftDeleteEntity {
    @ManyToOne(() => ProjectEntity, (p) => p.tasks)
    project!: ProjectEntity;

    @Column({length: 255})
    title!: string;

    @Column({type: "text", nullable: true})
    description?: string;

    @Column({length: 20})
    status!: string;

    @Column({length: 10})
    priority!: string;

    @Column({name: "due_date", type: "timestamptz", nullable: true})
    dueDate?: Date;

    @ManyToOne(() => UserEntity, (u) => u.assignedTasks, {nullable: true})
    assignee?: UserEntity;

    @OneToMany(() => TaskCommentEntity, (c) => c.task)
    comments!: TaskCommentEntity[];

    @OneToMany(() => TaskLabelEntity, (l) => l.task)
    labels!: TaskLabelEntity[];
}
