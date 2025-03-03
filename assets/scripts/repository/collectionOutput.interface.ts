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

export const scoreCollectionOutputSchema = createCollectionOutputSchema(scoreSchema)
export type ScoreCollectionOutput = z.infer<typeof scoreCollectionOutputSchema>

export const scoreCategoryCollectionOutputSchema = createCollectionOutputSchema(scoreCategorySchema)
export type ScoreCategoryCollectionOutput = z.infer<typeof scoreCategoryCollectionOutputSchema>

export const artistCollectionOutputSchema = createCollectionOutputSchema(artistSchema)
export type ArtistCollectionOutput = z.infer<typeof artistCollectionOutputSchema>

export const artistTypeCollectionOutputSchema = createCollectionOutputSchema(z.object({type: z.string()}))
export type ArtistTypeCollectionOutput = z.infer<typeof artistTypeCollectionOutputSchema>
