import { useQuery, UseQueryResult } from "react-query";
import { useState } from "react";
import { ScoreCategory } from "../../model/library/scoreCategory.interface";
import {fetchCategories, ScoreCategoryCollectionOutput} from "../../repository/library/category.repository";

interface AllCategoriesOutput {
  categories: ScoreCategory[];
  fetchData: {
    value: string;
    set: (v: string) => void;
  };
}

export function useCategories(): AllCategoriesOutput {
  const [value, setValue] = useState<string>("");

  const query: UseQueryResult<ScoreCategoryCollectionOutput> = useQuery({
    queryKey: ["allScoreCategories", value],
    queryFn: async () => fetchCategories(value),
  });

  return {
    categories: query.data?.data ?? [],
    fetchData: {
      value,
      set: (v: string = "") => setValue(v.trim()),
    },
  };
}
