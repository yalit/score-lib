import {useQuery, UseQueryResult} from "react-query";
import {fetchLastScores} from "../../repository/library.repository";
import {Score} from "../../model/library/score.interface";

export function useLastScores(): Score[] {
    const query: UseQueryResult<Score[]> = useQuery({
        queryKey: "lastScores",
        queryFn: fetchLastScores
    })

    if (!query.data) {
        return []
    }
    return query.data
}
