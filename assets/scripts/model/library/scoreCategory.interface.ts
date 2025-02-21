import {z} from "zod";

export const scoreCategorySchema = z.object({
    value: z.string(),
})

export type ScoreCategory = z.infer<typeof scoreCategorySchema>
