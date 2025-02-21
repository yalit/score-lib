import {z} from "zod";
import {scoreSchema} from "../model/library/score.interface";

export function createCollectionOutputSchema<T extends z.ZodTypeAny>(schema: T) {
    return z.object({
        member: z.array(schema),
        totalItems: z.number(),
    }).transform((a) => (
        {data: a.member, nbItems: a.totalItems}
    ));
}

export const scoreCollectionOutputSchema = createCollectionOutputSchema(scoreSchema)
export type ScoreCollectionOutput = z.infer<typeof scoreCollectionOutputSchema>
