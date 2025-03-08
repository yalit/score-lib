import {classnames} from "../../libraries/general";
import {ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, EllipsisIcon} from "lucide-react";

interface ScoreTablePaginationProps {
    page: number;
    totalItems: number;
    itemsPerPage: number;
    moveToPage: (page: number) => void;
    changeNbPerPage?: (nbPerPage: number) => void;
}

const POSSIBLE_NB_PER_PAGE = [10,20, 30, 50, 100]

export function ScoreTablePagination({page, itemsPerPage, totalItems, moveToPage, changeNbPerPage}: ScoreTablePaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    let pageNumbers = [...Array(Math.min(page + 4, totalPages+1)).keys()].filter(n => n >= page-3)

    return (
        <div className="w-full relative flex items-center">
            {(totalItems > itemsPerPage) && (
                <div className="data__table__line flex justify-center relative flex-1">
                    { page > 1 && (
                        <>
                            <span className="cursor-pointer" onClick={() => moveToPage(1)}><ChevronsLeftIcon className="h-4 w-4" /></span>
                            <span className="cursor-pointer" onClick={() => moveToPage(page-1)}><ChevronsLeftIcon className="h-4 w-4" /></span>
                        </>
                    )}
                    { page - 3 > 1 && (
                        <span><EllipsisIcon className="h-3 w-3" /></span>
                    )}

                    <span className="flex gap-1">
                        { pageNumbers.map((pageNumber) => (
                            <>
                                {pageNumber === page ?
                                    <span key={pageNumber}>( <span className="font-semibold underline">{page}</span>/{totalPages} )</span>
                                    : (
                                        <span key={pageNumber} className={classnames("cursor-pointer", pageNumber == page && "font-bold underline")} onClick={() => moveToPage(pageNumber)}>{pageNumber}</span>
                                    )}
                            </>
                        ))}
                    </span>

                    {page + 3 < totalPages && <span><EllipsisIcon className="h-3 w-3" /></span>}

                    {page < totalPages && (
                        <>
                    <span className="cursor-pointer" onClick={() => moveToPage(page+1)}><ChevronRightIcon className="h-4 w-4"/></span>
                            <span className="cursor-pointer" onClick={() => moveToPage(totalPages)}><ChevronsRightIcon className="h-4 w-4" /></span>
                        </>
                    )}
                </div>
            )}

            {(changeNbPerPage && totalPages > 1) && (
                <div className="w-max">
                    Nb. Per Page &nbsp;
                    <select className="px-2 outline-none focus:outline-none bg-white focus:bg-white" value={itemsPerPage}>
                        {POSSIBLE_NB_PER_PAGE.map((nbPerPage: number, index: number) => (
                            <option key={index} value={nbPerPage} onClick={() => changeNbPerPage(nbPerPage)}>{nbPerPage}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}
