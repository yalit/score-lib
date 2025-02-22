import {
    ChevronDoubleLeftIcon, ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import {classnames} from "../../libraries/general";

interface ScoreTablePaginationProps {
    page: number;
    totalItems: number;
    itemsPerPage: number;
    moveToPage: (page: number) => void;
}

export function ScoreTablePagination({page, itemsPerPage, totalItems, moveToPage}: ScoreTablePaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    let pageNumbers = [...Array(Math.min(page + 4, totalPages+1)).keys()].filter(n => n >= page-3)

    return (
        <>
            {(totalItems > itemsPerPage) && (
                <div className="data__table__line flex justify-center">
                    { page > 1 && (
                        <>
                            <span className="cursor-pointer" onClick={() => moveToPage(1)}><ChevronDoubleLeftIcon className="h-4 w-4" /></span>
                            <span className="cursor-pointer" onClick={() => moveToPage(page-1)}><ChevronLeftIcon className="h-4 w-4" /></span>
                        </>
                    )}
                    { page - 3 > 1 && (
                        <span><EllipsisHorizontalIcon className="h-3 w-3" /></span>
                    )}

                    <span className="flex gap-1">
                        { pageNumbers.map((pageNumber, index) => (
                            <>
                                {pageNumber === page ?
                                    <span>( <span className="font-semibold underline">{page}</span>/{totalPages} )</span>
                                    : (
                                        <span className={classnames("cursor-pointer", pageNumber == page && "font-bold underline")} onClick={() => moveToPage(pageNumber)}>{pageNumber}</span>
                                    )}
                            </>
                        ))}
                    </span>

                    {page + 3 < totalPages && <span><EllipsisHorizontalIcon className="h-3 w-3" /></span>}

                    {page < totalPages && (
                        <>
                    <span className="cursor-pointer" onClick={() => moveToPage(page+1)}><ChevronRightIcon className="h-4 w-4"/></span>
                            <span className="cursor-pointer" onClick={() => moveToPage(totalPages)}><ChevronDoubleRightIcon className="h-4 w-4" /></span>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
