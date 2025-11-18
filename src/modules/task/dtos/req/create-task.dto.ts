import { z } from "zod/index";

export class CreateTaskDto {
    description: string;
    title: string;
    priority: string;
    dueDate: string;
    projectId: string;
}