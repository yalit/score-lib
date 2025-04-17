import {useCallback, useMemo, useRef, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "./popover";
import {Button} from "./button";
import {Command} from "cmdk";
import {CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "./command";
import {Check, ChevronsUpDown, XIcon} from "lucide-react";
import {cn} from "../../lib/utils";
import {Badge} from "./badge";

export interface Option {
    value: string;
    label: string;
    disable?: boolean;
}

type PopoverSelectProps = {
    title: string
    selection: Option[]|Option,
    choices: Option[]
    selectValue: (id: string) => void
    removeValue: (id: string) => void
    canCreate?: boolean
}

export function PopoverSelect({title, selection, choices, selectValue, removeValue, canCreate = true}: PopoverSelectProps) {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const hasValue = (value: string) => {
        if (!Array.isArray(selection)) {
            return selection.value === value;
        }

        let found = false;
        selection.forEach(v => {
            if (v.value === value) {
                found = true;
            }
        })
        return found;
    }

    const selectionBadge = useCallback((item: Option, index: string = "") => (
        <Badge key={index}>
            <span>{item.label}</span>
            <XIcon
                className="h-4 w-4 cursor-pointer"
                onClick={() => removeValue(item.value !== "" ? item.value : item.label)}
            />
        </Badge>
    ), [selectValue])

    const handleClickForNew = () => {
        if (!canCreate) return

        selectValue(searchValue)
        setSearchValue("")
    }

    const handleSearchInput = (search: string) => {
        if (!search.endsWith(',')) {
            setSearchValue(search)
            return;
        }

        if (search.length > 2) {
            selectValue(search.slice(0, -1).trim());
            setSearchValue("")
        }
    }

    const onSelectValue = (value: string) => {
        selectValue(value)
        if (!Array.isArray(selection)) {
            setOpen(false);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between border-none shadow-none hover:background-none"
                    >
                        {title} <ChevronsUpDown className="opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput className="h-9" value={searchValue} onValueChange={handleSearchInput}/>
                        <CommandEmpty onClick={handleClickForNew}>
                            {canCreate ? <div className="cursor-pointer">Créer... {searchValue}</div> : <div>{searchValue} non-existant</div>}
                        </CommandEmpty>
                        <CommandList className="max-h-[300px] overflow-auto">
                            <CommandGroup>
                                {choices.map((choice: Option) => (
                                    <CommandItem
                                        key={choice.value}
                                        value={choice.label}
                                        onSelect={() => onSelectValue(choice.value)}
                                    >
                                        {choice.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                hasValue(choice.value) ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2 flex-wrap">
                {Array.isArray(selection) ?
                    selection.map((item: Option, index: number) => selectionBadge(item, String(index)))
                    : selectionBadge(selection)
                }
            </div>
        </div>
    )
}
