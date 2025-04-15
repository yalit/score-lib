import {useTranslator} from "../../hooks/useTranslator";
import ScoreTableColumnHeader from "./ScoreTableColumnHeader";
import {useContext} from "react";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";

export function ScoreTableHeader() {
    const {trans} = useTranslator();

    return (
        <div className="data__table__header">
            <ScoreTableColumnHeader title={trans('entity.score.fields.title.label')} property={'title'}/>
            <ScoreTableColumnHeader title={trans('entity.score.fields.reference.label')} property={'reference'}/>
            <ScoreTableColumnHeader title={trans('entity.score.fields.refs.label')}/>
            <ScoreTableColumnHeader title={trans('entity.score.fields.categories.label')}/>
            <ScoreTableColumnHeader title={trans('entity.score.fields.artists.label')}/>
            <ScoreTableColumnHeader />
        </div>
    )
}

