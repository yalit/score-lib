import {Direction, NoDirection} from "../../model/generics.interface";
import {useEffect, useState} from "react";
import {ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";

interface SortingIconProps {
    sort: (direction: Direction) => void
}

export default function SortingIcon ({sort}: SortingIconProps) {
    const [direction, setDirection] = useState<Direction | NoDirection>('');

    const chevronClassName = "h-4 w-4 bold";

    const toggleDirection = () => {
        const newDirection = direction === '' ? 'asc' : (direction === 'asc' ? 'desc' : 'asc');
        setDirection(newDirection);
    }

    useEffect(() => {
        if (direction === '') return
        sort(direction)
    }, [direction])

    const icons = {
        '': <ChevronUpDownIcon className={chevronClassName} onClick={toggleDirection} />,
        'asc': <ChevronUpIcon className={chevronClassName} onClick={toggleDirection} />,
        'desc': <ChevronDownIcon className={chevronClassName} onClick={toggleDirection} />,
    }

    return <>{icons[direction]}</>
}
