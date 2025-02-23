import {Score} from "../../model/library/score.interface";
import {ScoreTableHeader} from "./ScoreTableHeader";
import {Direction} from "../../model/generics.interface";

import '../../../styles/scoreTable.css'
import ScoreTableRow from "./ScoreTableRow";
import {AllowedScoreOrderBy, DEFAULT_NB_SCORES_PER_QUERY} from "../../repository/library.repository";
import {ScoreTablePagination} from "./ScoreTablePagination";

interface ScoreTableProps {
    scores: Score[],
    deleteScore: (score: Score) => void,
    sortTable?: (field: AllowedScoreOrderBy, direction: Direction) => void,
    moveToPage?: (page: number) => void,
    changeNbPerPage?: (nbPerPage: number) => void,
    nbTotalItems: number,
    itemsPerPage?: number,
    page?: number,
}

export default function ScoreTable({
                                       scores,
                                       deleteScore,
                                       sortTable,
                                       moveToPage,
                                       page = 1,
                                       itemsPerPage = DEFAULT_NB_SCORES_PER_QUERY,
                                       nbTotalItems,
                                       changeNbPerPage
                                   }: ScoreTableProps) {

    return (
        <div className="data__table">
            <ScoreTableHeader sortColumn={sortTable}/>
            {scores.map((score: Score, idx: number) => (
                <ScoreTableRow key={score.id} score={score} index={idx}
                               deleteScore={deleteScore}></ScoreTableRow>
            ))}
            {moveToPage && <ScoreTablePagination page={page || 1} totalItems={nbTotalItems}
                                                 itemsPerPage={itemsPerPage || DEFAULT_NB_SCORES_PER_QUERY}
                                                 moveToPage={moveToPage} changeNbPerPage={changeNbPerPage}/>}

        </div>
    )
}
