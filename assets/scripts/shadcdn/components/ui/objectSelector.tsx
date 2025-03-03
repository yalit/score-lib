import {Command, CommandEmpty, CommandItem, CommandList} from "./command";
import {Badge} from "./badge";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Command as CommandPrimitive} from "cmdk";
import {useEffect, useState} from "react";

type ObjectSelectorProps<T> = {
    value: T|null,
    selectables: T[],
    set: (item: T | null) => void,
    getDisplay: (item: T) => string,
    getId: (item: T) => string,
    getNew: (v: string) => T
}

export function ObjectSelector<T>({value, selectables, set, getId, getDisplay, getNew}: ObjectSelectorProps<T>) {
    const [selected, setSelected] = useState<T | null>(value);
    const [possibles, setPossibles] = useState<T[]>(selectables);
    const [inputValue, setInputValue] = useState<string>("");
    const [open, setOpen] = useState(false);

    const alreadySelected = (item: T) => !value || (getId(item) === getId(value) && getDisplay(item) === getDisplay(value))
    const selectValue = (item: T) => {setSelected(item);setInputValue("")}
    const removeValue = () => setSelected(null)

    useEffect(() => {
        set(selected)
    }, [selected]);

    useEffect(() => {
        if (inputValue === '') {
            setPossibles(selectables)
            return
        }

        setPossibles([getNew(inputValue)].concat(selectables))

    }, [inputValue, selectables]);

    return (
        <div className="relative">
            <Command>
                <div className="min-h-10 text-base px-3 md:text-sm flex flex-wrap items-center gap-2">
                    {selected &&
                        <Badge>
                            <span>{getDisplay(selected)}</span>
                            <XMarkIcon
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => removeValue()}
                            />
                        </Badge>
                    }
                    <CommandPrimitive.Input
                        className="flex h-10 flex-1 w-full border-b bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                        onInput={(e) => setInputValue(e.currentTarget.value)}
                        value={inputValue}
                    />
                </div>
                {open && (
                    <CommandList className="absolute z-[1000] top-full inset-x-0 bg-white rounded-b-md shadow">
                        {possibles.map((p: T) => (
                            <CommandItem
                                className="cursor-pointer"
                                key={getId(p)}
                                onSelect={() => selectValue(p)}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                disabled={alreadySelected(p)}
                                value={getDisplay(p)}
                            >
                                {getId(p) === "" ? (
                                    <div className="font-italic">Create a new ...<span className="font-semibold">{inputValue}</span></div>
                                ) : (
                                    <div>{getDisplay(p)}</div>
                                )}
                            </CommandItem>
                        ))}
                    </CommandList>
                )}
            </Command>
        </div>
    )
}
