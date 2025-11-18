import { z } from "zod";

export const CreateTaskSchema = z.object({
    description: z.string(),
    title: z.string(),
    priority: z.string(),
    dueDate: z.string(),
    projectId: z.string()
});
