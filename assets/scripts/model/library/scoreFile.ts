import {z} from "zod";

export const scoreFileSchema = z.object({
    id: z.string(),
    name: z.string(),
    extension: z.string(),
})

export type ScoreFile = z.infer<typeof scoreFileSchema>
