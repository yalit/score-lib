import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./select"

type ObjectSelectorProps<T> = {
    value: T,
    selectables: T[],
    set:(item: T|null) => void,
    getDisplay: (item: T) => string,
    getId: (item: T) => string
}
export function ObjectSelector<T> ({value, selectables, set, getId, getDisplay}: ObjectSelectorProps<T>) {

    const onSelect = (v) => console.log("Select value", v)

    return (
        <Select onValueChange={onSelect} defaultValue={getDisplay(value)}>
            <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
                {selectables.map(v => (
                    <SelectItem key={getId(v)} value={getId(v)}>{getDisplay{v}}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
