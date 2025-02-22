import {Score} from "../../model/library/score.interface";
import {Direction, NoDirection, OrderBy} from "../../model/generics.interface";
import {useQuery} from "react-query";
import {
    AllowedScoreOrderBy,
    DEFAULT_NB_SCORES_PER_QUERY, fetchScores,
    FetchScoresParameters
} from "../../repository/library.repository";
import {Dispatch, SetStateAction, useState} from "react";


interface AllScoresOutput {
    nbAllItems: number,
    scores: Score[],
    fetchData: {
        page: {value: number, set: Dispatch<SetStateAction<number>>},
        nbPerPage: {value: number, set: Dispatch<SetStateAction<number>>},
        order: {value: OrderBy<AllowedScoreOrderBy>, set: Dispatch<SetStateAction<OrderBy<AllowedScoreOrderBy>>>},
    }
}

export function useAllScores(): AllScoresOutput {
    const [page, setPage] = useState<number>(1);
    const [order, setOrder] = useState<OrderBy<AllowedScoreOrderBy>>({direction: "", by: ""});
    const [nbPerPage, setNbPerPage] = useState<number>(DEFAULT_NB_SCORES_PER_QUERY);

    const query = useQuery({
        queryKey: ["allScores", {page, order, nbPerPage}],
        queryFn: async () => fetchScores({page, order, nbPerPage}),
    })

    return {
        nbAllItems: query.data?.nbItems ?? -1,
        scores: query.data?.data ?? [],
        fetchData: {
            page: {value: page, set: setPage},
            nbPerPage: {value: nbPerPage, set: setNbPerPage},
            order: {value: order, set: setOrder}
        }
    }
}
