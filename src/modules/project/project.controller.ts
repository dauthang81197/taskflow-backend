import {Request, Response} from "express";
import {CreateProjectSchema} from "./project.schema";
import {projectService} from "./project.service";

export const ProjectController = {
    getMyProject: async (req: Request, res: Response) => {
        return await projectService.getProject(req, res);
    },
    create: async (req: Request, res: Response) => {
        const {name, description} = CreateProjectSchema.parse(req.body);
        return await projectService.create(req, res, name, description);
    },
    update: async (req: Request, res: Response) => {
        const {id} = req.params
        const {name, description} = CreateProjectSchema.parse(req.body);
        return await projectService.update(req, res, id, name, description);
    },
    delete: async (req: Request, res: Response) => {
        const {id} = req.params
        return await projectService.delete(req, res, id);
    },
    detail: async (req: Request, res: Response) => {
        const {id} = req.params
        return await projectService.detail(req, res, id)
    },
};
