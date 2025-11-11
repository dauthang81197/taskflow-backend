import {Request, Response} from "express";
import {CreateProjectSchema} from "./project.schema";
import {projectService} from "./project.service";

export const ProjectController = {
    create: async (req: Request, res: Response) => {
        const {name, description} = CreateProjectSchema.parse(req.body);
        return await projectService.create(res, name, description)
    },
}

