import { TaskRepository } from "./task.repository";
import { CommonResponse } from "../../utils/common-response";
import { Transactional } from "../../utils/transactions/transaction";
import { IsolationLevelEnum } from "../../utils/transactions/wrap-in-transaction";
import { AppDataSource } from "../../database/ormconfig";
import { NotFoundException, ValidationException } from '../../exceptions';
import { TaskQueryReqDto } from "./dtos/req/task-query.req.dto";
import { CreateTaskDto } from "./dtos/req/create-task.dto";
import { ProjectRepository } from "../project/project.repository";

export class TaskService {
    constructor(private readonly dataSource = AppDataSource,
                private taskRepo = new TaskRepository(),
                private projectRepo = new ProjectRepository()) {
    }

    async create(req, res, body: CreateTaskDto) {
        const userId = req.user?.id;
        await this._validateProject(body.projectId)
        const project = await this.taskRepo.createTask(body, userId);

        return CommonResponse.success(
            res,
            project,
            "Task created successfully",
            201
        );
    }

    async update(req, res, id, body: CreateTaskDto) {
        const userId = req.user?.id;
        const project = await this.taskRepo.updateTask(id, body);

        return CommonResponse.success(
            res,
            project,
            "Task updated successfully",
            201
        );
    }

    async delete(req, res, id: string) {
        const userId = req.user?.id;
        const task = await this.taskRepo.getDetailTask(id);
        if (!task) {
            throw new NotFoundException()
        }


        await this.taskRepo.deleteTask(id);

        return CommonResponse.success(
            res,
            task,
            "Task deleted successfully",
            200
        );
    }


    async detail(req, res, id: string) {
        const userId = req.user?.id;
        const project = await this.taskRepo.getDetailTask(id);

        return CommonResponse.success(
            res,
            project,
            "Task detail",
            200
        );
    }


    async getTasks(req, res) {
        const userId = req.user?.id;
        const {page, limit} = req.query
        const query = new TaskQueryReqDto()
        query.limit = limit;
        query.page = page;
        const project = await this.taskRepo.getTasks(userId, query);

        // @ts-ignore
        return CommonResponse.paginated(
            res,
            project,
            'Task list'
        );
    }

    private async _validateProject(projectId: string) {
        const project = await this.projectRepo.getDetailProject(projectId);
        if (!project) {
            throw new NotFoundException()
        }
    }
}

export const taskService = new TaskService();
