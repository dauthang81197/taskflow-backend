import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {UserEntity} from "../auth";


@Entity({name: "notifications"})
export class NotificationEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (u) => u.notifications)
    user!: UserEntity;

    @Column({length: 200})
    title!: string;

    @Column({type: "text"})
    message!: string;

    @Column({length: 50})
    type!: string; // task, automation, system

    @Column({name: "is_read", default: false})
    isRead!: boolean;
}
