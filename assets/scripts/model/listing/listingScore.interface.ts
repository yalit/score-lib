import { z } from "zod";

export const listingScoreSchema = z.object({
  "@id": z.string().optional(),
  "@type": z.string().optional(),
  name: z.string(),
  order: z.number(),
  score: z.object({
    id: z.string(),
    title: z.string(),
    reference: z.object({value: z.string()})
  }),
});

export type ListingScore = z.infer<typeof listingScoreSchema>;
