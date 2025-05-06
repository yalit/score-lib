import {ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon} from "lucide-react";
import {sortContext} from "../../context/global/sortContext";
import {useContext, useMemo} from "react";
import {SortableItem} from "../../model/global/sorting.interface";

export type SortInformation = {
    sortItem: SortableItem
}

export default function SortingIcon ({sortItem}: SortInformation) {
    const { state: {item, direction}, actions } = useContext(sortContext);
    const chevronClassName = "h-4 w-4 bold cursor-pointer";

    const toggleDirection = () => {
        const newDirection = direction === '' ? 'asc' : (direction === 'asc' ? 'desc' : 'asc');
        actions.sort(sortItem, newDirection)
    }

    const icons = {
        '': <ChevronsUpDownIcon className={chevronClassName} onClick={toggleDirection} />,
        'asc': <ChevronUpIcon className={chevronClassName} onClick={toggleDirection} />,
        'desc': <ChevronDownIcon className={chevronClassName} onClick={toggleDirection} />,
    }

    const displayIcon = useMemo(() => {
        if (item !== sortItem) return icons[""];

        return icons[direction];
    }, [item, direction]);

    return <>{displayIcon}</>
}
