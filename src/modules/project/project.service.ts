import {ProjectRepo} from "./project.repository";
import {CommonResponse} from "../../utils/common-response";


export class ProjectService {
    async create(req, res, name: string, description: string) {
        const userId = req.user?.id;
        const project = await ProjectRepo.createProject(name, description, userId)

        return CommonResponse.success(res, project, "Task created successfully", 201)
    }
}

export const projectService = new ProjectService();