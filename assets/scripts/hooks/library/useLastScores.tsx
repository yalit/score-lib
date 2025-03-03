import {useQuery, UseQueryResult} from "react-query";
import {Score} from "../../model/library/score.interface";
import {fetchLastScores, ScoreCollectionOutput} from "../../repository/library/score.repository";

export const lastScoresQueryKey = "lastScores";

export function useLastScores(): {nbItems: number, scores: Score[]} {
    const query: UseQueryResult<ScoreCollectionOutput> = useQuery({
        queryKey: lastScoresQueryKey,
        queryFn: fetchLastScores
    })

    if (!query.data) {
        return {nbItems: 0, scores: []}
    }

    return {nbItems: query.data.nbItems, scores: query.data.data}
}
