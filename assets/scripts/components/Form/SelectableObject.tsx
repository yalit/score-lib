import { FormField, FormItem } from "../../shadcdn/components/ui/form";
import { Label } from "../../shadcdn/components/ui/label";
import MultipleSelector from "../../shadcdn/components/ui/multipleSelector";
import {ObjectSelector} from "../../shadcdn/components/ui/objectSelector";
import {useCallback} from "react";
import {cn} from "../../shadcdn/lib/utils";

type SelectableObjectProps<T> = {
    control, name, 
    label: string, 
    getId: (v: T) => string, 
    getDisplay: (v: T) => string, 
    selectables: T[],
    getNew: (v: string) => T,
    classname?: string,
}

export function SelectableObject<T>({control, name, label, getId, getDisplay, selectables, getNew, classname = ""}: SelectableObjectProps<T>) {

    return (
            <FormItem className={cn("flex gap-2 items-center", classname)}>
              <Label>{label}</Label>
              <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <ObjectSelector
                        value={field.value}
                        selectables={selectables}
                        getId={getId}
                        getDisplay={getDisplay}
                        set={field.onChange}
                        getNew={getNew}
                    />
                )}
              />
            </FormItem>
    )
}
