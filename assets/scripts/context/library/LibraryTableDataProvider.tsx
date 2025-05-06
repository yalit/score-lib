import {PropsWithChildren, useEffect, useState} from "react";
import useDeleteScore from "../../hooks/library/useDeleteScore";
import {useAllScores} from "../../hooks/library/useAllScores";
import {AllowedFilterBy, AllowedSortBy} from "../../repository/library/score.repository";
import {SortBy} from "../../model/global/sorting.interface";
import {FilterBy} from "../../model/global/filtering.interface";
import {DEFAULT_NB_PER_PAGE} from "../global/tableDataContext";
import {LibraryTableDataContext} from "./libraryTableDataContext";

type AllScoresTableDataProviderProps = PropsWithChildren & {
    searchData: string | null
}

export const LibraryTableDataProvider = ({searchData, children}: AllScoresTableDataProviderProps) => {
    const {scores, nbTotalScores: nbTotalAllScores, setFetchParameters, refreshScores} = useAllScores()
    const [nbTotalScores, setNbTotalScores] = useState<number>(0);
    const deleteScore = useDeleteScore("", refreshScores)
    const [currentOrder, setCurrentOrder] = useState<SortBy<AllowedSortBy> | null>(null);
    const [currentFilter, setCurrentFilter] = useState<FilterBy<AllowedFilterBy>[] | null>(null);
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
            filter: currentFilter,
            search: searchData
        })
    }, [currentPage, nbPerPage, currentOrder, currentFilter, searchData]);

    const value = {
        state: {
            items: scores,
            currentOrder,
            currentFilter,
            nbPerPage,
            currentPage,
            nbTotalItems: nbTotalScores,
            canSort: true,
            canFilter: true,
            needPagination: true
        },
        actions: {deleteItem: deleteScore, setCurrentOrder, setCurrentFilter, setCurrentPage, setNbPerPage},
    }

    return <LibraryTableDataContext.Provider value={value}>{children}</LibraryTableDataContext.Provider>
}
