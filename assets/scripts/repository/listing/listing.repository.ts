import {Listing, listingSchema} from "../../model/listing/listing.interface";
import { createCollectionOutputSchema } from "../collectionOutput.interface";
import { z } from "zod";
import { buildUrl } from "../../libraries/general";
import {SortableItem, SortBy} from "../../model/global/sorting.interface";

export const listingCollectionOutputSchema =
  createCollectionOutputSchema(listingSchema);
export type ListingCollectionOutput = z.infer<
  typeof listingCollectionOutputSchema
>;

export type ListingAllowedSortedby = SortableItem & 'name' | 'date' | ''

export type FetchListingParameters = {
  page: number;
  nbPerPage?: number;
  search?: string|null;
  order?: SortBy<ListingAllowedSortedby> | null,
}

export async function fetchListings(parameters: FetchListingParameters): Promise<ListingCollectionOutput> {
  let fetchParams: { [k: string]: string } = {page: String(parameters.page)};

  if (parameters.order) {
    if (parameters.order.by !== "") {
      const orderParamName = `order[${parameters.order.by}]`;
      fetchParams = {
        ...fetchParams,
        [orderParamName]: parameters.order.direction,
      };
    }
  }

  let response = await fetch(buildUrl("/api/listings", fetchParams));
  let output: any = await response.json();
  return await listingCollectionOutputSchema.parseAsync(output);
}

export async function fetchListing(id: string): Promise<Listing|null> {
  if (id === '') return null

  let response  = await fetch('/api/listings/'+id)
  let output: any = await response.json()
  return await listingSchema.parseAsync(output)
}

export function deleteListing(listing: Listing): Promise<Response> {
  return fetch(`/api/listings/${listing.id}`, {
    method: "DELETE",
  });
}

