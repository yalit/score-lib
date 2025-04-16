import {createContext} from 'react';
import {Score} from "../../model/library/score.interface";
import {FilterBy, SortBy} from "../../model/generics.interface";
import {AllowedFilterBy, AllowedSortBy} from "../../repository/library/score.repository";
import {DEFAULT_NB_PER_PAGE} from "../../components/scoreTable/ScoreTablePagination";

export type ScoreTableData = {
    scores: Score[],
    nbTotalScores: number
    currentOrder: SortBy<AllowedSortBy> | null,
    currentFilter: FilterBy<AllowedFilterBy> | null,
    currentPage: number,
    nbPerPage: number,
    canSort: boolean,
    canFilter: boolean,
}

export type ScoreTableDataActions = {
    setCurrentOrder?: (order: SortBy<AllowedSortBy> | null) => void,
    setCurrentFilter?: (filter: FilterBy<AllowedFilterBy> | null) => void,
    setCurrentPage?: (page: number) => void,
    deleteScore: (score: Score) => void,
    setNbPerPage?: (page: number) => void,
}

type ScoreTableDataContextValue = {
    state: ScoreTableData,
    actions: ScoreTableDataActions,
}

export const ScoreTableDataContext = createContext<ScoreTableDataContextValue>(
    {
        state: {
            scores: [],
            currentFilter: null,
            currentOrder: null,
            currentPage: 1,
            nbPerPage: DEFAULT_NB_PER_PAGE,
            nbTotalScores: 0,
            canSort: false,
            canFilter: false,
        },
        actions: {
            deleteScore: (score: Score) => {},
        }
    }
);
