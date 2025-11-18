import {TaskRepository} from "./task.repository";
import {CommonResponse} from "../../utils/common-response";
import {Transactional} from "../../utils/transactions/transaction";
import {IsolationLevelEnum} from "../../utils/transactions/wrap-in-transaction";
import {AppDataSource} from "../../database/ormconfig";
import {NotFoundException, ValidationException} from '../../exceptions';
import {TaskQueryReqDto} from "./dtos/req/task-query.req.dto";
import {CreateTaskDto} from "./dtos/req/create-task.dto";
import {ProjectRepository} from "../project/project.repository";

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
            "Project created successfully",
            201
        );
    }

    async update(req, res, id, name: string, description: string) {
        const userId = req.user?.id;
        const project = await this.taskRepo.updateTask(id, name, description);

        return CommonResponse.success(
            res,
            project,
            "Project updated successfully",
            201
        );
    }

    async delete(req, res, id: string) {
        const userId = req.user?.id;
        const project = await this.taskRepo.getDetailTask(id);
        if (!project) {
            throw new NotFoundException()
        }
        if (project?.tasks?.length > 0) {
            throw new ValidationException()
        }

        await this.taskRepo.deleteTask(id);

        return CommonResponse.success(
            res,
            project,
            "Project updated successfully",
            200
        );
    }


    async detail(req, res, id: string) {
        const userId = req.user?.id;
        const project = await this.taskRepo.getDetailTask(id);

        return CommonResponse.success(
            res,
            project,
            "Project detail",
            200
        );
    }


    async getProject(req, res) {
        const userId = req.user?.id;
        const {page, limit} = req.query
        const query = new TaskQueryReqDto()
        query.limit = limit;
        query.page = page;
        const project = await this.taskRepo.getTasks(userId, query);

        return CommonResponse.paginated(
            res,
            project,
            'Project list'
        );
    }

    async private _validateProject(projectId: string) {
        const project = await this.projectRepo.getDetailProject(projectId);
        if(!project) {
            throw new NotFoundException()
        }
    }
}

export const taskService = new TaskService();
