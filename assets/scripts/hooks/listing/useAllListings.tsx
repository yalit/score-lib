import { useQuery } from "react-query";
import { Listing } from "../../model/listing/listing.interface";
import { fetchListings } from "../../repository/listing/listing.repository";

interface AllListingsOutput {
  nbTotal: number;
  listings: Listing[];
}

export function useAllListings(): AllListingsOutput {
  const query = useQuery({
    queryKey: "allListings",
    queryFn: async () => fetchListings(),
  });

  return {
    nbTotal: query.data?.nbItems ?? -1,
    listings: query.data?.data ?? [],
  };
}
