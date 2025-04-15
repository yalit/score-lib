import {createContext, PropsWithChildren} from 'react';
import {Score} from "../../model/library/score.interface";
import {FilterBy, SortBy} from "../../model/generics.interface";
import {AllowedFilterBy, AllowedSortBy, DEFAULT_NB_SCORES_PER_QUERY} from "../../repository/library/score.repository";

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
            nbPerPage: DEFAULT_NB_SCORES_PER_QUERY,
            nbTotalScores: 0,
            canSort: false,
            canFilter: false,
        },
        actions: {
            deleteScore: (score: Score) => {},
        }
    }
);
