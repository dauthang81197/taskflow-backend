import {z} from "zod";

export const CreateProjectSchema = z.object({
    description: z.string(),
    name: z.string(),
});