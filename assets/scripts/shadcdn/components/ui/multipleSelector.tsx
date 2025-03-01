import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandShortcut} from "./command";

import {Command as CommandPrimitive} from "cmdk"
import {useEffect, useState} from "react";
import {Badge} from "./badge";
import {XMarkIcon} from "@heroicons/react/24/outline";

type MultipleSelectorProps<T extends object> = {
    values: T[],
    setValue: (value: T[]) => void,
    displayValue: (v: T) => string,
    idValue: (v: T) => string,
    possibleValues: T[]
}
export default function MultipleSelector<T extends object>({
                                                               values,
                                                               setValue,
                                                               displayValue, idValue,
                                                               possibleValues,
                                                           }: MultipleSelectorProps<T>) {
    const [selectedValues, setSelectedValues] = useState<T[]>(values)
    const [open, setOpen] = useState<boolean>(false)

    const removeValue = (property: string): void => {
        setSelectedValues(selectedValues.filter(value => idValue(value) !== property));
    }

    useEffect(() => {
        onChange(selectedValues);
    }, [selectedValues]);

    return (
        <Command>
            <div className="min-h-10 text-base px-3 md:text-sm flex items-center gap-2">
                {values.map((v: T) => (
                    <Badge key={idValue(v)}>
                        <span>{displayValue(v)}</span>
                        <XMarkIcon className="h-4 w-4 cursor-pointer" onClick={() => removeValue(idValue(v))}/>
                    </Badge>))}
                <CommandPrimitive.Input
                    className="flex h-10 flex-1 w-full border-b bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    onFocus={() => setOpen(!open)}
                />
            </div>
            {open && (
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {possibleValues.map((p: T) => (
                        <CommandItem><span>{displayValue(p)}</span></CommandItem>
                    ))}
                </CommandList>
            )}
        </Command>
    )
}
