import {Command, CommandInput, CommandItem, CommandList,} from "./command";
import {Command as CommandPrimitive} from "cmdk";
import {useEffect, useState} from "react";
import {Badge} from "./badge";
import {XIcon} from "lucide-react";

type MultipleSelectorProps<T> = {
    values: T[];
    setValue: (value: T[]) => void;
    displayValue: (v: T) => string;
    idValue: (v: T) => string;
    selectables: T[];
    getNew?: (inputValue: string) => T;
};
export default function MultipleSelector<T>({
                                                values,
                                                setValue,
                                                displayValue,
                                                idValue,
                                                selectables,
                                                getNew
                                            }: MultipleSelectorProps<T>) {
    const [selectedValues, setSelectedValues] = useState<T[]>(values);
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [possibleValues, setPossibleValues] = useState<T[]>(selectables);

    const removeValue = (item: T): void => {
        setSelectedValues(
            selectedValues.filter((value) => idValue(value) !== idValue(item) || displayValue(value) !== displayValue(item)),
        );
    };

    const alreadySelected = (item: T): boolean =>
        selectedValues.filter((p) => idValue(p) === idValue(item) && displayValue(p) === displayValue(item)).length > 0;

    const selectValue = (item: T): void => {
        if (alreadySelected(item)) {
            return;
        }

        setSelectedValues(selectedValues.concat([item]));
        setInputValue("")
    };

    useEffect(() => {
        setValue(selectedValues);
    }, [selectedValues]);

    useEffect(() => {
        if (inputValue === '') {
            setPossibleValues(selectables)
            return
        }

        // allow to "register" a new value by ending with a comma
        if (getNew && inputValue.endsWith(',')) {
            selectValue(getNew(inputValue.slice(0,-1)))
            setPossibleValues([getNew(inputValue)].concat(selectables));
            return;
        }
    }, [inputValue]);

    return (
        <div className="relative">
            <Command>
                <div className="min-h-10 text-base px-3 md:text-sm flex flex-wrap items-center gap-2">
                    {values.map((v: T) => (
                        <Badge key={idValue(v)+String(Math.random())}>
                            <span>{displayValue(v)}</span>
                            <XIcon
                                className="h-4 w-4 cursor-pointer"
                                onClick={() => removeValue(v)}
                            />
                        </Badge>
                    ))}
                    <CommandInput
                        className="flex h-10 flex-1 w-full border-b bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        onFocus={() => {console.log("Focused..."); setOpen(true)}}
                        onClick={() => {console.log("Clicked"); setOpen(true)}}
                        onBlur={() => setOpen(false)}
                        value={inputValue}
                        onInput={(e) => setInputValue(e.currentTarget.value)}
                    />
                </div>
                {open && (
                    <CommandList className="absolute z-[1000] top-full inset-x-0 bg-white rounded-b-md">
                        {possibleValues.map((p: T) => (
                            <CommandItem
                                key={idValue(p)}
                                className="cursor-pointer"
                                onSelect={() => selectValue(p)}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                disabled={alreadySelected(p)}
                                value={displayValue(p)}
                            >
                                {getNew && idValue(p) === '' ? (
                                    <div className="font-italic">Add ... <span
                                        className="font-semibold">{displayValue(p)}</span></div>
                                ) : (
                                    <div>{displayValue(p)}</div>
                                )}
                            </CommandItem>
                        ))}
                    </CommandList>
                )}
            </Command>
        </div>
    );
}
