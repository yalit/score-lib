import {lastScoresQueryKey, useLastScores} from "../../hooks/library/useLastScores";
import {useEffect, useState} from "react";
import useDeleteScore from "../../hooks/library/useDeleteScore";
import {LibraryTableDataContext} from "./libraryTableDataContext";

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
            items: scores,
            currentOrder: null,
            currentFilter: null,
            nbPerPage: NB_LATEST_SCORES,
            currentPage: 1,
            nbTotalItems: nbTotalScores,
            canSort: false,
            canFilter: false,
            needPagination: false,
        },
        actions: {deleteItem: deleteScore},
    }

    return <LibraryTableDataContext.Provider value={value}>{children}</LibraryTableDataContext.Provider>
}
