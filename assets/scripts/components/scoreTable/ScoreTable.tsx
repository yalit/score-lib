import {Score} from "../../model/library/score.interface";
import {ScoreTableHeader} from "./ScoreTableHeader";
import {Direction} from "../../model/generics.interface";

import '../../../styles/scoreTable.css'
import ScoreTableRow from "./ScoreTableRow";

interface ScoreTableProps {
    scores: Score[]
}

export default function ScoreTable({scores}: ScoreTableProps) {

    const sortColumn = (field: string, direction: Direction) => {
        console.log(field, direction);
    }

    return (
        <div className="data__table">
            <ScoreTableHeader sortColumn={sortColumn}/>
            {scores.map((score: Score, idx: number) => (
                <ScoreTableRow key={score.id} score={score} index={idx}
                               deleteScore={(score) => console.log("Deleting", score)}></ScoreTableRow>
            ))}
        </div>
    )
}
