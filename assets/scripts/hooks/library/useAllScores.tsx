import {Score} from "../../model/library/score.interface";
import {useQuery} from "react-query";
import {DEFAULT_NB_SCORES_PER_QUERY, fetchScores, FetchScoresParameters,} from "../../repository/library.repository";
import {useState} from "react";

const initialScoreFetchData: FetchScoresParameters = {
    page: 1,
    nbPerPage: DEFAULT_NB_SCORES_PER_QUERY,
    order: {direction: "", by: ""}
}

interface AllScoresOutput {
    nbAllItems: number,
    scores: Score[],
    fetchData: {
        values: FetchScoresParameters,
        set: (value: Partial<FetchScoresParameters>) => void
    }
}

export function useAllScores(): AllScoresOutput {
    const [fetchData, setFetchData] = useState<FetchScoresParameters>(initialScoreFetchData);

    const query = useQuery({
        queryKey: ["allScores", fetchData],
        queryFn: async () => fetchScores(fetchData),
    })

    return {
        nbAllItems: query.data?.nbItems ?? -1,
        scores: query.data?.data ?? [],
        fetchData: {
            values: fetchData,
            set: (value) => setFetchData({...fetchData, ...value})
        }
    }
}
