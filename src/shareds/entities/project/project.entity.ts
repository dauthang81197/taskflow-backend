import {Entity, Column, ManyToOne, OneToMany} from "typeorm";
import {SoftDeleteEntity} from "../../../shareds/entities/soft-delete.entity";
import {TaskEntity} from "./task.entity";
import {UserEntity} from "../auth";

@Entity({name: "projects"})
export class ProjectEntity extends SoftDeleteEntity {
    @Column({length: 200})
    name!: string;

    @Column({type: "text", nullable: true})
    description?: string;

    @ManyToOne(() => UserEntity, (u) => u.projects)
    owner!: UserEntity;

    @OneToMany(() => TaskEntity, (t) => t.project)
    tasks!: TaskEntity[];
}
