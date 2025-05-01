import { listingSchema } from "../../model/listing/listing.interface";
import { createCollectionOutputSchema } from "../collectionOutput.interface";
import { z } from "zod";
import { buildUrl } from "../../libraries/general";

export const listingCollectionOutputSchema =
  createCollectionOutputSchema(listingSchema);
export type ListingCollectionOutput = z.infer<
  typeof listingCollectionOutputSchema
>;

export async function fetchListings(): Promise<ListingCollectionOutput> {
  let response = await fetch(buildUrl("/api/listings"));
  let output: any = await response.json();
  return await listingCollectionOutputSchema.parseAsync(output);
}
