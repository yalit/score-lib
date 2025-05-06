import { z } from "zod";


export const listingScoreScoreSchema = z.object({
    "@id": z.string(),
    id: z.string(),
    title: z.string(),
    reference: z.object({value: z.string()})
})

export const listingScoreSchema = z.object({
  "@id": z.string().optional(),
  "@type": z.string().optional(),
  id: z.string(),
  name: z.string(),
  order: z.number(),
  score: listingScoreScoreSchema,
});

export type ListingScoreScore = z.infer<typeof listingScoreScoreSchema>;
export type ListingScore = z.infer<typeof listingScoreSchema>;
