import {Score} from "../../model/library/score.interface";
import {useQuery, useQueryClient} from "react-query";
import {useMemo, useState} from "react";
import {
    fetchScores,
    FetchScoresParameters
} from "../../repository/library/score.repository";
import {DEFAULT_NB_PER_PAGE} from "../../context/global/tableDataContext";

const initialScoreFetchData: FetchScoresParameters = {
    page: 1,
    nbPerPage: DEFAULT_NB_PER_PAGE
}

interface AllScoresOutput {
    nbTotalScores: number,
    scores: Score[],
    setFetchParameters: (value: Partial<FetchScoresParameters>) => void,
    refreshScores: () => void
}

export function useAllScores(): AllScoresOutput {
    const [fetchScoresParameters, setFetchScoresParameters] = useState<FetchScoresParameters>(initialScoreFetchData);

    const queryClient = useQueryClient();
    const queryKey = useMemo(() => {
        return ['allScores', fetchScoresParameters]
    }, [fetchScoresParameters])
    const query = useQuery({
        queryKey: queryKey,
        queryFn: async () => fetchScores(fetchScoresParameters),
    })

    return {
        nbTotalScores: query.data?.nbItems ?? -1,
        scores: query.data?.data ?? [],
        setFetchParameters: (value: Partial<FetchScoresParameters>) => setFetchScoresParameters({...fetchScoresParameters, ...value}),
        refreshScores: () => queryClient.invalidateQueries({queryKey})
    }
}
