import {z} from "zod";
import {scoreSchema} from "../model/library/score.interface";
import {scoreCategorySchema} from "../model/library/scoreCategory.interface";
import {artistSchema, scoreArtistSchema} from "../model/library/scoreArtist.interface";

export function createCollectionOutputSchema<T extends z.ZodTypeAny>(schema: T) {
    return z.object({
        member: z.array(schema),
        totalItems: z.number(),
    }).transform((a) => (
        {data: a.member, nbItems: a.totalItems}
    ));
}

