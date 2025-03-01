import {useQuery} from "react-query";
import {fetchCategories,} from "../../repository/library.repository";
import {useState} from "react";
import {ScoreCategory} from "../../model/library/scoreCategory.interface";

interface AllCategoriesOutput {
    categories: ScoreCategory[],
    fetchData: {
        value: string,
        set: (v: string) => void
    }
}

export function useCategories(): AllCategoriesOutput {
    const [value, setValue] = useState<string>('');

    const query = useQuery({
        queryKey: ["allScoreCategories", value],
        queryFn: async () => fetchCategories(value)
    })

    return {
        categories: query.data ?? [],
        fetchData: {
            value,
            set: (v: string = '') => setValue(v.trim()),
        }
    }
}
