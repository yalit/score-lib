import {lastScoresQueryKey, useLastScores} from "../../hooks/library/useLastScores";
import {useEffect, useState} from "react";
import {ScoreTableDataContext } from "./scoreTableDataContext";
import useDeleteScore from "../../hooks/library/useDeleteScore";

export const LatestScoreTableDataProvider = ({children}) => {
    const {scores} = useLastScores()
    const [nbTotalScores, setNbTotalScores] = useState<number>(0);
    const deleteScore = useDeleteScore(lastScoresQueryKey)

    useEffect(() => {
       setNbTotalScores(scores.length)
    }, [scores]);

    const value = {
        state: {scores, currentOrder: null, currentFilter: null, nbPerPage: scores.length, currentPage: 1, nbTotalScores, canSort: false, canFilter: false},
        actions: {deleteScore},
    }

    return <ScoreTableDataContext.Provider value={value}>{children}</ScoreTableDataContext.Provider>
}
