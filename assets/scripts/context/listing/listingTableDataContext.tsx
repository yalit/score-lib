import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {DEFAULT_NB_PER_PAGE, TableDataContextValue} from "../global/tableDataContext";
import {Listing} from "../../model/listing/listing.interface";
import {FetchListingParameters, ListingAllowedSortedby} from "../../repository/listing/listing.repository";
import {FilterableItem, FilterBy} from "../../model/global/filtering.interface";
import {useAllScores} from "../../hooks/library/useAllScores";
import useDeleteScore from "../../hooks/library/useDeleteScore";
import {SortBy} from "../../model/global/sorting.interface";
import {AllowedFilterBy, AllowedSortBy} from "../../repository/library/score.repository";
import {LibraryTableDataContext} from "../library/libraryTableDataContext";
import {useAllListings} from "../../hooks/listing/useAllListings";
import useDeleteListing from "../../hooks/listing/useDeleteListing";

export const ListingTableDataContext = createContext<TableDataContextValue<Listing, ListingAllowedSortedby, FilterableItem>>(
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

type ListingTableDataProviderProps = PropsWithChildren & {
    searchData: string | null
}

export const ListingTableDataProvider = ({searchData, children}: ListingTableDataProviderProps) => {
    const {listings, nbTotal, setFetchParams, refresh} = useAllListings()
    const [nbTotalItems, setNbTotalItems] = useState<number>(0)
    const [currentOrder, setCurrentOrder] = useState<SortBy<ListingAllowedSortedby> | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [nbPerPage, setNbPerPage] = useState<number>(2);
    const deleteListing = useDeleteListing("", refresh)

    useEffect(() => {
        setNbTotalItems(nbTotal)
    }, [nbTotal]);

    useEffect(() => {
        setFetchParams({
            page: currentPage,
            nbPerPage,
            order: currentOrder,
            search: searchData
        })
    }, [currentPage, nbPerPage, currentOrder, searchData]);

    const value = {
        state: {
            items: listings,
            currentOrder,
            currentFilter: null,
            nbPerPage,
            currentPage,
            nbTotalItems,
            canSort: true,
            canFilter: false,
            needPagination: true
        },
        actions: {deleteItem: deleteListing, setCurrentOrder, setCurrentPage, setNbPerPage},
    }

    return <ListingTableDataContext.Provider value={value}>{children}</ListingTableDataContext.Provider>
}
