import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "./command";

import { Command as CommandPrimitive } from "cmdk";
import { useEffect, useState } from "react";
import { Badge } from "./badge";
import { XMarkIcon } from "@heroicons/react/24/outline";

type MultipleSelectorProps<T> = {
  values: T[];
  setValue: (value: T[]) => void;
  displayValue: (v: T) => string;
  idValue: (v: T) => string;
  possibleValues: T[];
};
export default function MultipleSelector<T>({
  values,
  setValue,
  displayValue,
  idValue,
  possibleValues,
}: MultipleSelectorProps<T>) {
  const [selectedValues, setSelectedValues] = useState<T[]>(values);
  const [open, setOpen] = useState<boolean>(false);

  const removeValue = (property: string): void => {
    setSelectedValues(
      selectedValues.filter((value) => idValue(value) !== property),
    );
  };

  const alreadySelected = (item: T): boolean =>
    selectedValues.filter((p) => idValue(p) === idValue(item)).length > 0;

  const selectValue = (item: T): void => {
    if (alreadySelected(item)) {
      return;
    }

    setSelectedValues(selectedValues.concat([item]));
  };

  useEffect(() => {
    setValue(selectedValues);
  }, [selectedValues]);

  return (
    <div className="relative">
        <Command>
        <div className="min-h-10 text-base px-3 md:text-sm flex flex-wrap items-center gap-2">
            {values.map((v: T) => (
            <Badge key={idValue(v)}>
                <span>{displayValue(v)}</span>
                <XMarkIcon
                className="h-4 w-4 cursor-pointer"
                onClick={() => removeValue(idValue(v))}
                />
            </Badge>
            ))}
            <CommandPrimitive.Input
            className="flex h-10 flex-1 w-full border-b bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            />
        </div>
        {open && (
            <CommandList className="absolute z-[1000] top-full inset-x-0 bg-white rounded-b-md">
            <CommandEmpty>No results found.</CommandEmpty>
            {possibleValues.map((p: T) => (
                <CommandItem
                key={idValue(p)}
                onSelect={() => selectValue(p)}
                onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                disabled={alreadySelected(p)}
                >
                <span>{displayValue(p)}</span>
                </CommandItem>
            ))}
            </CommandList>
        )}
        </Command>
    </div>
  );
}
