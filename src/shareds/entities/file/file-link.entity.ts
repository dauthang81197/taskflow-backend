import {Entity, Column, ManyToOne} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {FileEntity} from "./file.entity";

@Entity({name: "file_links"})
export class FileLinkEntity extends BaseEntity {
    @ManyToOne(() => FileEntity, (f) => f.links)
    file!: FileEntity;

    @Column({length: 255})
    url!: string;

    @Column({name: "expires_at", type: "timestamptz"})
    expiresAt!: Date;
}
