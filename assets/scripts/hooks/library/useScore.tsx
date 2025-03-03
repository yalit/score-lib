import {Score} from "../../model/library/score.interface";
import {useQuery, UseQueryResult} from "react-query";
import {useRedirect} from "../useRedirect";
import {fetchScore} from "../../repository/library/score.repository";

export function useScore(scoreId: string): Score | null {
    const redirect = useRedirect();

    if (scoreId === '') {
        return null
    }

    const query: UseQueryResult<Score>  = useQuery({
        queryKey: ['score', scoreId],
        queryFn: async () => {
            if (scoreId === '') return null
            return fetchScore(scoreId)
        },
    })

    if (query.isError) {
        //TODO : redirect to a 404...
        redirect('/')
    }

    return query.data ?? null
}
