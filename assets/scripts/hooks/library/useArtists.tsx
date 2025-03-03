import { useQuery, UseQueryResult } from "react-query";
import {fetchArtists, fetchCategories} from "../../repository/library.repository";
import { useState } from "react";
import { ScoreCategory } from "../../model/library/scoreCategory.interface";
import {
  ArtistCollectionOutput,
  ScoreCategoryCollectionOutput
} from "assets/scripts/repository/collectionOutput.interface";
import {Artist} from "../../model/library/scoreArtist.interface";

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
