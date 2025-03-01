import {z} from "zod";

export const scoreCategorySchema = z.object({
    id: z.string().nullable(),
    value: z.string(),
})

export type ScoreCategory = z.infer<typeof scoreCategorySchema>
