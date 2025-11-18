import { Request, Response } from "express";
import { CreateTaskSchema } from "./task.schema";
import { taskService } from "./task.service";
import { CreateProjectSchema } from "../project/project.schema";

export const TaskController = {
    getMyTasks: async (req: Request, res: Response) => {
        return await taskService.getTasks(req, res);
    },
    create: async (req: Request, res: Response) => {
        const body = CreateTaskSchema.parse(req.body);
        return await taskService.create(req, res, body);
    },
    update: async (req: Request, res: Response) => {
        const {id} = req.params
        const body = CreateTaskSchema.parse(req.body);
        return await taskService.update(req, res, id, body);
    },
    delete: async (req: Request, res: Response) => {
        const {id} = req.params
        return await taskService.delete(req, res, id);
    },
    detail: async (req: Request, res: Response) => {
        const {id} = req.params
        return await taskService.detail(req, res, id)
    },
};
