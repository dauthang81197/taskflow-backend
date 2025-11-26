import { TaskRepository } from "./task.repository";
import { CommonResponse } from "../../utils/common-response";
import { AppDataSource } from "../../database/ormconfig";
import { NotFoundException } from "../../exceptions";
import { TaskQueryReqDto } from "./dtos/req/task-query.req.dto";
import { CreateTaskDto } from "./dtos/req/create-task.dto";
import { ProjectRepository } from "../project/project.repository";
import { CreateLabelTaskDto } from "./dtos/req/create-label-task.dto";
import { TaskLabelRepository } from "./repositories/task-label.repository";

export class TaskService {
  constructor(
    private readonly dataSource = AppDataSource,
    private taskRepo = new TaskRepository(),
    private projectRepo = new ProjectRepository(),
    private taskLabel = new TaskLabelRepository()
  ) {}

  async create(req, res, body: CreateTaskDto) {
    const userId = req.user?.id;
    await this._validateProject(body.projectId);
    const project = await this.taskRepo.createTask(body, userId);

    return CommonResponse.success(
      res,
      project,
      "Task created successfully",
      201
    );
  }

  async update(req, res, id, body: CreateTaskDto) {
    const project = await this.taskRepo.updateTask(id, body);

    return CommonResponse.success(
      res,
      project,
      "Task updated successfully",
      201
    );
  }

  async delete(req, res, id: string) {
    const task = await this.taskRepo.getDetailTask(id);
    if (!task) {
      throw new NotFoundException();
    }

    await this.taskRepo.deleteTask(id);

    return CommonResponse.success(res, task, "Task deleted successfully", 200);
  }

  async detail(req, res, id: string) {
    const project = await this.taskRepo.getDetailTask(id);

    return CommonResponse.success(res, project, "Task detail", 200);
  }

  async getTasks(req, res) {
    const userId = req.user?.id;
    const { page, limit } = req.query;
    const query = new TaskQueryReqDto();
    query.limit = limit;
    query.page = page;
    const project = await this.taskRepo.getTasks(userId, query);
    return CommonResponse.paginated(res, project, "Task list");
  }

  async addLabel(req, res, body: CreateLabelTaskDto) {
    const userId = req.user?.id;
    const taskLabel = this.taskLabel.saveTaskLabel(body, userId);
    return CommonResponse.success(res, taskLabel, "Task label", 200);
  }

  private async _validateProject(projectId: string) {
    const project = await this.projectRepo.getDetailProject(projectId);
    if (!project) {
      throw new NotFoundException();
    }
  }
}

export const taskService = new TaskService();
