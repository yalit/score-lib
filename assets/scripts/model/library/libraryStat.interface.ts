import {z} from "zod";

export const libraryStatSchema = z.object({
    nbScores: z.number(),
    nbLists: z.number(),
    nbCreatedInLastWeek: z.number(),
})

export type LibraryStat = z.infer<typeof libraryStatSchema>
