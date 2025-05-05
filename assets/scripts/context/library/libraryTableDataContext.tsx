import {createContext} from "react";
import {DEFAULT_NB_PER_PAGE, TableDataContextValue} from "../global/tableDataContext";
import {Score} from "../../model/library/score.interface";
import {AllowedFilterBy, AllowedSortBy} from "../../repository/library/score.repository";

export const LibraryTableDataContext = createContext<TableDataContextValue<Score, AllowedSortBy, AllowedFilterBy>>(
    {
        state: {
            items: [],
            currentFilter: null,
            currentOrder: null,
            currentPage: 1,
            nbPerPage: DEFAULT_NB_PER_PAGE,
            nbTotalItems: 0,
            canSort: false,
            canFilter: false,
            needPagination: true,
        },
        actions: {}
    }
);
