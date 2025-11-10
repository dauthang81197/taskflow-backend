import {Entity, Column, ManyToOne, OneToMany} from "typeorm";
import {BaseEntity} from "../../../shareds/entities/base.entity";
import {FileLinkEntity} from "./file-link.entity";
import {UserEntity} from "../auth";

@Entity({name: "files"})
export class FileEntity extends BaseEntity {
    @ManyToOne(() => UserEntity, (u) => u.files)
    owner!: UserEntity;

    @Column({name: "file_name", length: 255})
    fileName!: string;

    @Column({name: "mime_type", length: 100})
    mimeType!: string;

    @Column()
    size!: number;

    @Column({name: "s3_key", length: 255})
    s3Key!: string;

    @Column({name: "s3_url", length: 255})
    s3Url!: string;

    @OneToMany(() => FileLinkEntity, (l) => l.file)
    links!: FileLinkEntity[];
}
