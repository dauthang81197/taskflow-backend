import { EntityManager } from "typeorm";
import { TypeORMRepository } from "../../../common/base-repository";
import { TaskLabelEntity } from "../../../shareds/entities";
import { CreateLabelTaskDto } from "../dtos/req/create-label-task.dto";

export class TaskLabelRepository extends TypeORMRepository<TaskLabelEntity> {
  constructor(manager?: EntityManager) {
    super(TaskLabelEntity, manager);
  }

  async saveTaskLabel(body: CreateLabelTaskDto, userId: string) {
    return await this.repo.save({
      name: body.name,
      color: body.color,
      user: { id: userId },
    });
  }
}
