import {ProjectRepo} from "./project.repository";
import {CommonResponse} from "../../utils/common-response";


export class ProjectService {
    async create(res, name: string, description: string) {
        const project = await ProjectRepo.createProject(name, description)

        return CommonResponse.success(res, project, "Task created successfully", 201)
    }
}

export const projectService = new ProjectService();