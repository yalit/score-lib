import {Listing, listingSchema} from "../../model/listing/listing.interface";
import { createCollectionOutputSchema } from "../collectionOutput.interface";
import { z } from "zod";
import { buildUrl } from "../../libraries/general";
import {SortableItem, SortBy} from "../../model/global/sorting.interface";
import {Score, scoreSchema} from "../../model/library/score.interface";
import {FormScore} from "../../pages/library/score/ScoreForm";
import {FormListing} from "../../pages/listing/ListingForm";
import {listingScoreSchema} from "../../model/listing/listingScore.interface";
import {format} from "date-fns";

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

const saveListingScoreSchema = listingScoreSchema.merge(z.object({
  id: z.string().optional(),
  score: z.object({
    "@id": z.string(),
  }).transform((s: Score) => s["@id"])
}))

const saveListingSchema = listingSchema.merge(z.object({
  id: z.string().optional(),
  date: z.date().transform(d => format(d, 'y-MM-dd')),
  scores: z.array(saveListingScoreSchema)
}))

export async function createListing(listing: FormListing): Promise<Listing> {
  const parameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/ld+json"
    },
  }

  return saveListing(`/api/listings`, parameters, listing)
}

export async function updateListing(listing: FormListing): Promise<Listing> {
  const parameters = {
    method: "PUT",
    headers: {
      "Content-Type": "application/ld+json"
    },
  }

  return saveListing(`/api/listings/${listing.id}`, parameters, listing)

}

async function saveListing(url: string, parameters, listing: FormListing): Promise<Listing> {
  console.log('saving listing', listing)
  let response = await fetch(url, {
    ...parameters,
    body:JSON.stringify(saveListingSchema.parse(listing)),
  })

  //TODO : handle error

  let output = await response.json()
  return await listingSchema.parseAsync(output)
}
