import {classnames} from "../../libraries/general";
import {ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, EllipsisIcon} from "lucide-react";
import {useContext} from "react";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";

export const POSSIBLE_NB_PER_PAGE = [10, 20, 30, 50, 100]
export const DEFAULT_NB_PER_PAGE = 20

export function ScoreTablePagination() {
    const {state, actions} = useContext(ScoreTableDataContext)

    const totalPages = Math.ceil(state.nbTotalScores / state.nbPerPage)
    let pageNumbers = [...Array(Math.min(state.currentPage + 4, totalPages + 1)).keys()].filter(n => n >= state.currentPage - 3)

    const moveToPage = (page: number) => {
        if (!actions.setCurrentPage) return
        actions.setCurrentPage(page)
    }

    const changeNbPerPage = (nb: number) => {
        if (!actions.setNbPerPage) return
        actions.setNbPerPage(nb)
    }

    return (
        <div className="w-full relative flex items-center">
            <div className="data__table__line flex justify-center relative flex-1">
                {state.currentPage > 1 && (
                    <>
                        <span className="cursor-pointer" onClick={() => moveToPage(1)}><ChevronsLeftIcon
                            className="h-4 w-4"/></span>
                        <span className="cursor-pointer" onClick={() => moveToPage(state.currentPage - 1)}><ChevronsLeftIcon
                            className="h-4 w-4"/></span>
                    </>
                )}
                {state.currentPage - 3 > 1 && (
                    <span><EllipsisIcon className="h-3 w-3"/></span>
                )}

                <span className="flex gap-1">
                        {pageNumbers.map((pageNumber) => (
                            <div key={pageNumber}>
                                {pageNumber === state.currentPage ?
                                    <span key={pageNumber}>( <span
                                        className="font-semibold underline">{state.currentPage}</span>/{totalPages} )</span>
                                    : (
                                        <span key={pageNumber}
                                              className={classnames("cursor-pointer", pageNumber == state.currentPage && "font-bold underline")}
                                              onClick={() => moveToPage(pageNumber)}>{pageNumber}</span>
                                    )}
                            </div>
                        ))}
                    </span>

                {state.currentPage + 3 < totalPages && <span><EllipsisIcon className="h-3 w-3"/></span>}

                {state.currentPage < totalPages && (
                    <>
                        <span className="cursor-pointer"
                              onClick={() => moveToPage(state.currentPage + 1)}><ChevronRightIcon className="h-4 w-4"/></span>
                        <span className="cursor-pointer" onClick={() => moveToPage(totalPages)}><ChevronsRightIcon
                            className="h-4 w-4"/></span>
                    </>
                )}
            </div>

            <div className="w-max">
                Nb. Per Page &nbsp;
                <select className="px-2 outline-none focus:outline-none bg-white focus:bg-white" value={state.nbPerPage}>
                    {POSSIBLE_NB_PER_PAGE.map((nbPerPage: number, index: number) => (
                        <option key={index} value={nbPerPage}
                                onClick={() => changeNbPerPage(nbPerPage)}>{nbPerPage}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
