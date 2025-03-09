import {z} from "zod";

const searchMatchingSchema = z.object({
    field: z.string(),
    snippet: z.string(),
})

export type SearchMatching = z.infer<typeof searchMatchingSchema>

export const searchResultSchema = z.object({
    id: z.string(),
    title: z.string(),
    matchings: z.array(searchMatchingSchema)
})

export type SearchResult = z.infer<typeof searchResultSchema>
