import {Direction, NoDirection} from "../../model/generics.interface";
import SortingIcon from "./SortingIcon";
import {useTranslator} from "../../hooks/useTranslator";
import {AllowedScoreOrderBy} from "../../repository/library.repository";
import {useState} from "react";

interface ScoreTableHeaderProps {
    sortColumn?: (field: string, direction: Direction) => void;
}

type SortColumn = {[k in AllowedScoreOrderBy]: Direction|NoDirection}
const initialSortColumn: SortColumn = {title: '', reference: '', "": ''}

export function ScoreTableHeader({sortColumn}: ScoreTableHeaderProps) {
    const {trans} = useTranslator();
    const [directions, setDirections] = useState<SortColumn>(initialSortColumn);

    const tableSortColumn = (column: AllowedScoreOrderBy, direction: Direction | NoDirection) => {
        setDirections({...initialSortColumn, [column]: direction})
        if (direction === '') return

        if (!sortColumn) return;

        sortColumn(column, direction)
    }

    return(
        <div className="data__table__header">
            <div className="data__table__header_cell flex items-center justify-between">
                <span>{trans('entity.score.fields.title.label')}</span>
                {sortColumn && <span className="mr-4 cursor-pointer"><SortingIcon sort={(direction: Direction) => tableSortColumn('title', direction)} direction={directions.title} /></span>}
            </div>
            <div className="data__table__header_cell flex items-center justify-between">
                <span>{trans('entity.score.fields.reference.label')}</span>
                {sortColumn && <span className="mr-4 cursor-pointer"><SortingIcon sort={(direction: Direction) => tableSortColumn('reference', direction)} direction={directions.reference} /></span>}
            </div>
            <div className="data__table__header_cell">{trans('entity.score.fields.refs.label')}</div>
            <div className="data__table__header_cell">{trans('entity.score.fields.categories.label')}</div>
            <div className="data__table__header_cell">{trans('entity.score.fields.artists.label')}</div>
            <div className="data__table__header_cell"></div>
        </div>
    )
}

