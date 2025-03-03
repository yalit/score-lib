import {Direction, NoDirection} from "../../model/generics.interface";
import {ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";

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
        '': <ChevronUpDownIcon className={chevronClassName} onClick={toggleDirection} />,
        'asc': <ChevronUpIcon className={chevronClassName} onClick={toggleDirection} />,
        'desc': <ChevronDownIcon className={chevronClassName} onClick={toggleDirection} />,
    }

    return <>{icons[direction]}</>
}
