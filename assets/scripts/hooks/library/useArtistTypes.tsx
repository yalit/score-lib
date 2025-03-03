import { useQuery, UseQueryResult } from "react-query";
import {fetchArtists, fetchArtistTypes, fetchCategories} from "../../repository/library.repository";
import { useState } from "react";
import { ScoreCategory } from "../../model/library/scoreCategory.interface";
import {
  ArtistCollectionOutput, ArtistTypeCollectionOutput,
  ScoreCategoryCollectionOutput
} from "assets/scripts/repository/collectionOutput.interface";
import {Artist} from "../../model/library/scoreArtist.interface";

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
