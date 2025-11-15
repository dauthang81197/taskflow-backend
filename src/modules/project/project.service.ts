import { ProjectRepository } from "./project.repository";
import { CommonResponse } from "../../utils/common-response";
import { Transactional } from "../../utils/transactions/transaction";
import { IsolationLevelEnum } from "../../utils/transactions/wrap-in-transaction";
import { AppDataSource } from "../../database/ormconfig";
import { NotFoundException } from '../../exceptions';

export class ProjectService {
    constructor(private readonly dataSource = AppDataSource, private projectRepo = new ProjectRepository()) {
    }

    async create(req, res, name: string, description: string) {
        const userId = req.user?.id;
        const project = await this.projectRepo.createProject(name, description, userId);

        return CommonResponse.success(
            res,
            project,
            "Project created successfully",
            201
        );
    }

    async update(req, res, id, name: string, description: string) {
        const userId = req.user?.id;
        const project = await this.projectRepo.updateProject(id, name, description);

        return CommonResponse.success(
            res,
            project,
            "Project updated successfully",
            201
        );
    }

    async delete(req, res, id: string) {
        const userId = req.user?.id;
        const project = await this.projectRepo.getDetailProject(id);
        if (!project) {
            throw new NotFoundException()
        }
        if (project?.tasks?.length > 0 && project?.tasks?.filter(item => item)) {

        }
        const projectDelete = await this.projectRepo.deleteProject(id);

        return CommonResponse.success(
            res,
            project,
            "Project updated successfully",
            200
        );
    }


    async detail(req, res, id: string) {
        const userId = req.user?.id;
        const project = await this.projectRepo.getDetailProject(id);

        return CommonResponse.success(
            res,
            project,
            "Project detail",
            200
        );
    }


    async getProject(req, res, id: string) {
        const userId = req.user?.id;
        const {page, limit} = req.query
        // const project = await this.projectRepo.getProjects(id);

        return CommonResponse.success(
            res,
            null,
            "Project detail",
            200
        );
    }
}

export const projectService = new ProjectService();
