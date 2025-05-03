import {lastScoresQueryKey, useLastScores} from "../../hooks/library/useLastScores";
import {useEffect, useState} from "react";
import {ScoreTableDataContext} from "./scoreTableDataContext";
import useDeleteScore from "../../hooks/library/useDeleteScore";

export const NB_LATEST_SCORES = 10

export const LatestScoreTableDataProvider = ({children}) => {
    const {scores} = useLastScores()
    const [nbTotalScores, setNbTotalScores] = useState<number>(NB_LATEST_SCORES);
    const deleteScore = useDeleteScore(lastScoresQueryKey)

    useEffect(() => {
        setNbTotalScores(scores.length)
    }, [scores]);

    const value = {
        state: {
            scores,
            currentOrder: null,
            currentFilter: null,
            nbPerPage: NB_LATEST_SCORES,
            currentPage: 1,
            nbTotalScores,
            canSort: false,
            canFilter: false
        },
        actions: {deleteScore},
    }

    return <ScoreTableDataContext.Provider value={value}>{children}</ScoreTableDataContext.Provider>
}
