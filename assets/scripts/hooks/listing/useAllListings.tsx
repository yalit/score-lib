import {useQuery, useQueryClient} from "react-query";
import { Listing } from "../../model/listing/listing.interface";
import {FetchListingParameters, fetchListings} from "../../repository/listing/listing.repository";
import {FetchScoresParameters} from "../../repository/library/score.repository";
import {DEFAULT_NB_PER_PAGE} from "../../context/global/tableDataContext";
import {useMemo, useState} from "react";

interface AllListingsOutput {
  nbTotal: number;
  listings: Listing[];
  setFetchParams: (value: Partial<FetchListingParameters>) => void,
  refresh: () => void
}

const initialFetchData: FetchListingParameters = {
  page: 1,
  nbPerPage: DEFAULT_NB_PER_PAGE
}

export function useAllListings(): AllListingsOutput {
  const [fetchParams, setFetchParams] = useState<FetchListingParameters>(initialFetchData)

  const queryClient = useQueryClient();
  const queryKey = useMemo(()=> ['allListings', fetchParams], [fetchParams])

  const query = useQuery({
    queryKey: queryKey,
    queryFn: async () => fetchListings(fetchParams),
  });

  return {
    nbTotal: query.data?.nbItems ?? -1,
    listings: query.data?.data ?? [],
    setFetchParams: (value: Partial<FetchListingParameters>) => setFetchParams({...fetchParams, ...value}),
    refresh: () => queryClient.invalidateQueries({queryKey})
  };
}
