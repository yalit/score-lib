import { z } from "zod";
import { listingScoreSchema } from "./listingScore.interface";

export const listingSchema = z.object({
  "@id": z.string().optional(),
  "@type": z.string().optional(),
  id: z.string(),
  name: z.string(),
  date: z.string().transform((s): Date => {
    const parts = s.split('-')
    return new Date(+parts[0], +parts[1]-1, +parts[2]);
  }),
  scores: z.array(listingScoreSchema),
});

export type Listing = z.infer<typeof listingSchema>;
