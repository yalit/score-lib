import {z} from "zod";

export const scoreFileSchema = z.object({
    '@id': z.string().optional(),
    '@type': z.string().optional(),
    name: z.string(),
})

export type ScoreFile = z.infer<typeof scoreFileSchema>
