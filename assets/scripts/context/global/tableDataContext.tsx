import {SortableItem, SortBy} from "../../model/global/sorting.interface";
import {FilterableItem, FilterBy} from "../../model/global/filtering.interface";
import {createContext} from "react";

export const DEFAULT_NB_PER_PAGE = 10 //20

export type TableData<T, S extends SortableItem, F extends FilterableItem> = {
    items: T[],
    nbTotalItems: number
    currentOrder: SortBy<S> | null,
    currentFilter: FilterBy<F>[] | null,
    currentPage: number,
    nbPerPage: number,
    canSort: boolean,
    canFilter: boolean,
    needPagination: boolean,
}

export type TableDataActions<T, S extends SortableItem, F extends FilterableItem> = {
    setCurrentOrder?: (order: SortBy<S> | null) => void,
    setCurrentFilter?: (filter: FilterBy<F>[] | null) => void,
    setCurrentPage?: (page: number) => void,
    setNbPerPage?: (page: number) => void,
    deleteItem?: (item: T) => void,
}

export type TableDataContextValue<T, S extends SortableItem, F extends FilterableItem> = {
    state: TableData<T, S, F>,
    actions: TableDataActions<T, S, F>,
}

