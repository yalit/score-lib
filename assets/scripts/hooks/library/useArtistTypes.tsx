import { useQuery, UseQueryResult } from "react-query";
import {ArtistTypeCollectionOutput, fetchArtistTypes} from "../../repository/library/artist.repository";

interface ArtistTypesOutput {
  types: string[];
}

export function useArtistTypes(): ArtistTypesOutput {

  const query: UseQueryResult<ArtistTypeCollectionOutput> = useQuery({
    queryKey: "artistTypes",
    queryFn: async () => fetchArtistTypes(),
  });

  return {
    types: query.data?.data.map(d => d.type) ?? [],
  };
}
