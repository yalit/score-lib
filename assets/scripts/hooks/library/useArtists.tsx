import { useQuery, UseQueryResult } from "react-query";
import { useState } from "react";
import {Artist} from "../../model/library/scoreArtist.interface";
import {ArtistCollectionOutput, fetchArtists} from "../../repository/library/artist.repository";

interface AllArtistsOutput {
  artists: Artist[];
  fetchData: {
    name: string;
    set: (v: string) => void;
  };
}

export function useArtists(): AllArtistsOutput {
  const [name, setName] = useState<string>("");

  const query: UseQueryResult<ArtistCollectionOutput> = useQuery({
    queryKey: ["allArtists", name],
    queryFn: async () => fetchArtists(name),
  });

  return {
    artists: query.data?.data ?? [],
    fetchData: {
      name,
      set: (v: string = "") => setName(v.trim()),
    },
  };
}
