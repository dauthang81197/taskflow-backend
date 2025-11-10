import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {UserEntity} from "../auth";

@Entity({name: "notification_subscriptions"})
export class NotificationSubscriptionEntity extends BaseEntity {
    @ManyToOne(() => UserEntity)
    user!: UserEntity;

    @Column({name: "socket_id", length: 100})
    socketId!: string;

    @Column({name: "connected_at", type: "timestamptz"})
    connectedAt!: Date;

    @Column({name: "disconnected_at", type: "timestamptz", nullable: true})
    disconnectedAt?: Date;
}
