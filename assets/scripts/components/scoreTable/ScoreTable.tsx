import {Score} from "../../model/library/score.interface";
import {ScoreTableHeader} from "./ScoreTableHeader";

import '../../../styles/scoreTable.css'
import ScoreTableRow from "./ScoreTableRow";
import {ScoreTablePagination} from "./ScoreTablePagination";
import {useContext, useMemo} from "react";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";

export default function ScoreTable() {
    const {state} = useContext(ScoreTableDataContext)

    const hasNavigation = useMemo<boolean>(() => state.scores.length < state.nbTotalScores, [state.scores, state.nbTotalScores])
    return (
        <div className="data__table">
            <ScoreTableHeader />
            {state.scores.map((score: Score, idx: number) =>
                <ScoreTableRow key={score.id} score={score} index={idx}/>
            )}
            {hasNavigation && <ScoreTablePagination />  }
        </div>
    )
}
