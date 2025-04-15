import SortingIcon from "./SortingIcon";
import {useContext, useMemo} from "react";
import {ScoreTableDataContext} from "../../context/library/scoreTableDataContext";
import {AllowedSortBy, isAllowedToSort} from "../../repository/library/score.repository";
import {Direction, NoDirection} from "../../model/generics.interface";

type ScoreTableColumnHeaderProps = {
    title?: string;
    property?: string
}
export default function ScoreTableColumnHeader({ title, property }: ScoreTableColumnHeaderProps) {
    const {state, actions} = useContext(ScoreTableDataContext)

    const canSort = useMemo<boolean>(() =>{
        if (!state.canSort) return false
        return isAllowedToSort(property ?? '')
    }, [state.canSort])

    const sort = (direction: Direction) => {
        if (!actions.setCurrentOrder) {return }
        actions.setCurrentOrder({by: property as AllowedSortBy, direction})
    }

    const direction = useMemo<Direction | NoDirection>(() => {
        if (!state.currentOrder) return ""

        return property === state.currentOrder.by ? state.currentOrder.direction : ""
    }, [state.currentOrder])

    return (
        <div className="data__table__header_cell flex items-center justify-between">
            {title && <span>{title}</span>}
            {canSort &&
                <span className="mr-4 cursor-pointer">
                    <SortingIcon sort={sort} direction={direction}/>
                </span>
            }
        </div>
    )
}
