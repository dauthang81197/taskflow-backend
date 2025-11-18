import {z} from "zod";

export const CreateTaskSchema = z.object({
    description: z.string(),
    title: z.string(),
    priority: z.string(),
    dueDate: z.date(),
    projectId: z.string()
});
