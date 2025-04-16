import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "./popover";
import {Button} from "./button";
import {Command} from "cmdk";
import {CommandGroup, CommandInput, CommandItem, CommandList} from "./command";
import {Check, ChevronsUpDown, XIcon} from "lucide-react";
import {cn} from "../../lib/utils";
import {Badge} from "./badge";

export interface Option {
    value: string;
    label: string;
    disable?: boolean;
}

type PopoverMultipleSelectProps = {
    title: string
    values: Option[],
    choices: Option[]
    getNew?: (value: string) => void
    selectValue: (id: string) => void;
}

export function PopoverMultipleSelect({title, values, choices, getNew, selectValue}: PopoverMultipleSelectProps) {
    const [open, setOpen] = useState(false);
    const hasValue = (value: string) => {
        let found = false;
        values.forEach(v => {
            if (v.value === value) {
                found = true;
            }
        })
        return found;
    }
    return (
        <div className="flex items-center gap-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {title} <ChevronsUpDown className="opacity-50"/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput className="h-9"/>
                        <CommandList className="max-h-[300px] overflow-auto">
                            <CommandGroup>
                                {choices.map((choice: Option) => (
                                    <CommandItem
                                        key={choice.value}
                                        value={choice.label}
                                        onSelect={() => selectValue(choice.value)}
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
                {values.map((value, index) => (
                    <Badge key={index}>
                        <span>{value.label}</span>
                        <XIcon
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => selectValue(value.value)}
                        />
                    </Badge>
                ))}
            </div>
        </div>
    )
}
