import {z} from "zod";

export const scoreReferenceSchema = z.object({
    '@id': z.string().optional(),
    '@type': z.string().optional(),
    value: z.string(),
    information: z.string().optional(),
})

export type ScoreReference = z.infer<typeof scoreReferenceSchema>;
