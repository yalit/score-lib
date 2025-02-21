import {z} from "zod";

export const scoreReferenceSchema = z.object({
    value: z.string(),
    information: z.string().optional(),
})

export type ScoreReference = z.infer<typeof scoreReferenceSchema>;
