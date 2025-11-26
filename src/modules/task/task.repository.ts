import { EntityManager } from "typeorm";
import { TaskEntity } from "../../shareds/entities";
import { TypeORMRepository } from "../../common/base-repository";
import { TaskQueryReqDto } from "./dtos/req/task-query.req.dto";
import { CreateTaskDto } from "./dtos/req/create-task.dto";
import { StatusTaskEnum } from "./task.enum";

export class TaskRepository extends TypeORMRepository<TaskEntity> {
  constructor(manager?: EntityManager) {
    super(TaskEntity, manager);
  }

  async createTask(body: CreateTaskDto, userId: string) {
    return this.repo.insert({
      title: body.title,
      dueDate: body.dueDate,
      status: StatusTaskEnum.TODO,
      description: body.description,
      priority: body.priority,
      assignee: { id: userId },
      project: { id: body.projectId },
    });
  }

  async updateTask(id: string, body: CreateTaskDto) {
    return this.repo.update(id, {
      title: body.title,
      dueDate: body.dueDate,
      status: StatusTaskEnum.TODO,
      description: body.description,
      priority: body.priority,
    });
  }

  async deleteTask(id: string) {
    return this.repo.delete(id);
  }

  async getDetailTask(id: string): Promise<TaskEntity> {
    return this.repo.findOne({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        assignee: { id: true, name: true },
      },
      relations: {
        assignee: true,
      },
    });
  }

  async getTasks(userId: string, query: TaskQueryReqDto) {
    const qb = this.repo
      .createQueryBuilder("t")
      .select([
        "t.id",
        "t.title",
        "t.description",
        "t.status",
        "t.dueDate",
        "u.id",
        "u.name",
      ])
      .leftJoin("t.assignee", "u");

    if (userId) {
      qb.andWhere("u.id = :userId", { userId });
    }
    return await this.list({
      limit: query?.limit,
      page: query?.page,
      queryBuilder: qb,
    });
  }
}
