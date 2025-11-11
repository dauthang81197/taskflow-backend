import {AppDataSource} from "../../database/ormconfig";
import {ProjectEntity} from "../../shareds/entities";

export const ProjectRepo =
    AppDataSource.getRepository(ProjectEntity).extend({
        async createProject(name: string, description: string, userId: string) {
            return this.insert({
                name,
                description,
                owner: {id: userId},
            })
        },
    });
