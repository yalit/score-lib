import {z} from "zod";
import {scoreReferenceSchema} from "./scoreReference.interface";
import {scoreCategorySchema} from "./scoreCategory.interface";
import {scoreArtistSchema} from "./scoreArtist.interface";
import {scoreFileSchema} from "./scoreFile";

export const scoreSchema = z.object({
    id: z.string(),
    title: z.string(),
    reference: scoreReferenceSchema,
    otherReferences: z.array(scoreReferenceSchema),
    categories: z.array(scoreCategorySchema),
    artists:z.array(scoreArtistSchema),
    files: z.array(scoreFileSchema),
})

export type Score = z.infer<typeof scoreSchema>;
