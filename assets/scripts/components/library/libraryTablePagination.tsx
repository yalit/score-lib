import {classnames} from "../../libraries/general";
import {ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, EllipsisIcon} from "lucide-react";
import {useContext, useMemo} from "react";
import {TableCell, TableRow} from "../../shadcdn/components/ui/table";
import {LibraryTableDataContext} from "../../context/library/libraryTableDataContext";

export const POSSIBLE_NB_PER_PAGE = [10, 20, 30, 50, 100]

export function LibraryTablePagination() {
    const {
        state: {
            currentPage,
            nbPerPage,
            nbTotalItems,
            needPagination
        }, actions
    } = useContext(LibraryTableDataContext)

    const totalPages = useMemo<number>(() => Math.ceil(nbTotalItems / nbPerPage), [nbTotalItems, nbPerPage])
    const minPageNumber = useMemo<number>(() => Math.max(currentPage - 3, 1), [currentPage])
    const maxPageNumber = useMemo<number>(() => Math.min(currentPage + 3, totalPages + 1), [currentPage, totalPages])
    const pageNumbers = useMemo<number[]>(() => [...Array(maxPageNumber).keys()].filter(n => n >= minPageNumber), [maxPageNumber, minPageNumber])

    const moveToPage = (page: number) => {
        if (!actions.setCurrentPage) return
        actions.setCurrentPage(page)
    }

    const changeNbPerPage = (nb: number) => {
        if (!actions.setNbPerPage) return
        actions.setNbPerPage(nb)
    }

    return (
        <>
            {needPagination && (
                <TableRow>
                    <TableCell colSpan={4}>
                        <div className="w-full flex gap-2 items-center justify-start">
                            {/*Go to the first page*/}
                            {currentPage > 2 &&
                                <ChevronsLeftIcon className="h-4 w-4 cursor-pointer" onClick={() => moveToPage(1)}/>}
                            {/*Go to the previous page*/}
                            {currentPage > 1 &&
                                <ChevronLeftIcon className="h-4 w-4 cursor-pointer"
                                                 onClick={() => moveToPage(currentPage - 1)}/>}

                            {minPageNumber > 1 && <EllipsisIcon className="h-3 w-3"/>}

                            <span className="flex gap-1">
                                {pageNumbers.map((pageNumber) => (
                                    <div key={pageNumber}>
                                        {pageNumber === currentPage ?
                                            <span key={pageNumber}>( <span
                                                className="font-semibold underline">{currentPage}</span>/{totalPages} )</span>
                                            : <span key={pageNumber}
                                                    className={classnames("cursor-pointer", pageNumber == currentPage && "font-bold underline")}
                                                    onClick={() => moveToPage(pageNumber)}>{pageNumber}</span>
                                        }
                                    </div>
                                ))}
                            </span>

                            {maxPageNumber < totalPages + 1 && <EllipsisIcon className="h-3 w-3"/>}

                            {/*Go to the next page */}
                            {currentPage < totalPages &&
                                <ChevronRightIcon className="h-4 w-4 cursor-pointer"
                                                  onClick={() => moveToPage(currentPage + 1)}/>}

                            {/*Go to last page*/}
                            {currentPage < totalPages - 1 &&
                                <ChevronsRightIcon className="h-4 w-4 cursor-pointer"
                                                   onClick={() => moveToPage(totalPages)}/>}
                        </div>
                    </TableCell>
                    <TableCell colSpan={2}>
                        <div className="flex gap-2 items-center justify-end">
                            Nb. Per Page &nbsp;
                            <select className="px-2 outline-none focus:outline-none bg-white focus:bg-white"
                                    value={nbPerPage} onChange={(e) => changeNbPerPage(parseInt(e.target.value))}>
                                {POSSIBLE_NB_PER_PAGE.map((nbPerPage: number, index: number) => (
                                    <option key={index} value={nbPerPage}>{nbPerPage}</option>
                                ))}
                            </select>
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}
