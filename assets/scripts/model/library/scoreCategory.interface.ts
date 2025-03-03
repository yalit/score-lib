import {z} from "zod";

export const scoreCategorySchema = z.object({
    '@id': z.string().optional(),
    '@type': z.string().optional(),
    value: z.string(),
})

export type ScoreCategory = z.infer<typeof scoreCategorySchema>
