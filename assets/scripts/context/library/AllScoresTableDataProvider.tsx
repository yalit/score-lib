import {useEffect, useState} from "react";
import {ScoreTableDataContext} from "./scoreTableDataContext";
import useDeleteScore from "../../hooks/library/useDeleteScore";
import {useAllScores} from "../../hooks/library/useAllScores";
import {FilterBy, SortBy} from "../../model/generics.interface";
import {AllowedFilterBy, AllowedSortBy} from "../../repository/library/score.repository";
import {DEFAULT_NB_PER_PAGE} from "../../components/scoreTable/ScoreTablePagination";

export const AllScoresTableDataProvider = ({children}) => {
    const {scores, nbTotalScores: nbTotalAllScores, setFetchParameters, refreshScores} = useAllScores()
    const [nbTotalScores, setNbTotalScores] = useState<number>(0);
    const deleteScore = useDeleteScore("", refreshScores)
    const [currentOrder, setCurrentOrder] = useState<SortBy<AllowedSortBy> | null>(null);
    const [currentFilter, setCurrentFilter] = useState<FilterBy<AllowedFilterBy> | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [nbPerPage, setNbPerPage] = useState<number>(DEFAULT_NB_PER_PAGE);

    useEffect(() => {
        setNbTotalScores(nbTotalAllScores)
    }, [nbTotalAllScores]);

    useEffect(() => {
        setFetchParameters({
            page: currentPage,
            nbPerPage,
            order: currentOrder,
            filter: currentFilter
        })
    }, [currentPage, nbPerPage, currentOrder, currentFilter]);

    const value = {
        state: {
            scores,
            currentOrder,
            currentFilter,
            nbPerPage,
            currentPage,
            nbTotalScores,
            canSort: true,
            canFilter: true
        },
        actions: {deleteScore, setCurrentOrder, setCurrentFilter, setCurrentPage, setNbPerPage},
    }

    return <ScoreTableDataContext.Provider value={value}>{children}</ScoreTableDataContext.Provider>
}
