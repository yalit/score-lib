import {Direction, NoDirection} from "../../model/generics.interface";
import {ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon} from "lucide-react";

interface SortingIconProps {
    sort: (direction: Direction) => void,
    direction: Direction | NoDirection,
}

export default function SortingIcon ({sort, direction}: SortingIconProps) {
    const chevronClassName = "h-4 w-4 bold";

    const toggleDirection = () => {
        const newDirection = direction === '' ? 'asc' : (direction === 'asc' ? 'desc' : 'asc');
        sort(newDirection)
    }

    const icons = {
        '': <ChevronsUpDownIcon className={chevronClassName} onClick={toggleDirection} />,
        'asc': <ChevronUpIcon className={chevronClassName} onClick={toggleDirection} />,
        'desc': <ChevronDownIcon className={chevronClassName} onClick={toggleDirection} />,
    }

    return <>{icons[direction]}</>
}
