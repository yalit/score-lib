import {useTranslation} from "react-i18next";
import {ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {Direction, NoDirection} from "../../model/generics.interface";
import SortingIcon from "./SortingIcon";

interface ScoreTableHeaderProps {
    sortColumn: (field: string, direction: Direction) => void;
}
export function ScoreTableHeader({sortColumn}: ScoreTableHeaderProps) {
    const {t} = useTranslation();

    return(
        <div className="data__table__header">
            <div className="data__table__header_cell w-3/12 flex items-center justify-between">
                <span>{t('entity.score.fields.title.label')}</span>
                <span className="mr-4 cursor-pointer"><SortingIcon sort={(direction: Direction) => sortColumn('title', direction)} /></span>
            </div>
            <div className="data__table__header_cell w-3/12">{t('entity.score.fields.refs.label')}</div>
            <div className="data__table__header_cell w-3/12">{t('entity.score.fields.categories.label')}</div>
            <div className="data__table__header_cell w-3/12">{t('entity.score.fields.artists.label')}</div>
            <div className="data__table__header_cell w-[60px]"></div>
        </div>
    )
}

