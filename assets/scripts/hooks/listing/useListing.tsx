import { useQuery, UseQueryResult } from "react-query";
import { useRedirect } from "../useRedirect";
import { Listing } from "../../model/listing/listing.interface";
import { fetchListing } from "../../repository/listing/listing.repository";

export function useListing(id: string): Listing | null {
  const redirect = useRedirect();

  if (id === "") {
    return null;
  }

  const query: UseQueryResult<Listing> = useQuery({
    queryKey: ["listing", id],
    queryFn: async () => {
      if (id === "") return null;
      return fetchListing(id);
    },
  });

  if (query.isError) {
    //TODO : redirect to a 404...
    redirect("/");
  }

  return query.data ?? null;
}
