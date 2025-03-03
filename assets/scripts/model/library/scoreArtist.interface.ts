import {z} from "zod";

export const artistSchema = z.object({
    id: z.string().nullable(),
    name: z.string(),
})

export type Artist = z.infer<typeof artistSchema>

export const scoreArtistSchema = z.object({
    artist: artistSchema,
    type: z.string(),
})

export type ScoreArtist = z.infer<typeof scoreArtistSchema>
