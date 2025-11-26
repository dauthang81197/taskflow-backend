import { ProjectRepository } from "./project.repository";
import { CommonResponse } from "../../utils/common-response";
import { AppDataSource } from "../../database/ormconfig";
import { NotFoundException, ValidationException } from "../../exceptions";
import { ProjectQueryReqDto } from "./dtos/req/project-query.req.dto";

export class ProjectService {
  constructor(
    private readonly dataSource = AppDataSource,
    private projectRepo = new ProjectRepository()
  ) {}

  async create(req, res, name: string, description: string) {
    const userId = req.user?.id;
    const project = await this.projectRepo.createProject(
      name,
      description,
      userId
    );

    return CommonResponse.success(
      res,
      project,
      "Project created successfully",
      201
    );
  }

  async update(req, res, id, name: string, description: string) {
    const project = await this.projectRepo.updateProject(id, name, description);

    return CommonResponse.success(
      res,
      project,
      "Project updated successfully",
      201
    );
  }

  async delete(req, res, id: string) {
    const project = await this.projectRepo.getDetailProject(id);
    if (!project) {
      throw new NotFoundException();
    }
    if (project?.tasks?.length > 0) {
      throw new ValidationException();
    }

    await this.projectRepo.deleteProject(id);

    return CommonResponse.success(
      res,
      project,
      "Project updated successfully",
      200
    );
  }

  async detail(req, res, id: string) {
    const project = await this.projectRepo.getDetailProject(id);

    return CommonResponse.success(res, project, "Project detail", 200);
  }

  async getProject(req, res) {
    const userId = req.user?.id;
    const { page, limit } = req.query;
    const query = new ProjectQueryReqDto();
    query.limit = limit;
    query.page = page;
    const project = await this.projectRepo.getProjects(userId, query);

    return CommonResponse.paginated(res, project, "Project list");
  }
}

export const projectService = new ProjectService();
