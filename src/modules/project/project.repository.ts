import { EntityManager } from "typeorm";
import { ProjectEntity } from "../../shareds/entities";
import { TypeORMRepository } from "../../common/base-repository";
import { ProjectQueryReqDto } from "./dtos/req/project-query.req.dto";

export class ProjectRepository extends TypeORMRepository<ProjectEntity> {
  constructor(manager?: EntityManager) {
    super(ProjectEntity, manager);
  }

  async createProject(name: string, description: string, userId: string) {
    return this.repo.insert({
      name,
      description,
      owner: { id: userId },
    });
  }

  async updateProject(id: string, name: string, description: string) {
    return this.repo.update(id, {
      name,
      description,
    });
  }

  async deleteProject(id: string) {
    return this.repo.delete(id);
  }

  async getDetailProject(id: string): Promise<ProjectEntity> {
    return this.repo.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        owner: { id: true, name: true },
        tasks: { id: true, title: true },
      },
      relations: {
        owner: true,
        tasks: true,
      },
    });
  }

  async getProjects(userId: string, query: ProjectQueryReqDto) {
    const qb = this.repo
      .createQueryBuilder("p")
      .select(["p.id", "p.name", "p.description", "u.id", "u.name"])
      .leftJoin("p.owner", "u");

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
