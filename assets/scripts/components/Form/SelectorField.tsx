import { FormField, FormItem } from "../../shadcdn/components/ui/form";
import { Label } from "../../shadcdn/components/ui/label";
import {Option, PopoverSelect} from "../../shadcdn/components/ui/popoverSelect";
import {cn} from "../../shadcdn/lib/utils";

type SelectorFieldProps<T> = {
    control, name,
    label: string,
    getId: (v: T) => string,
    getDisplay: (v: T) => string,
    selectables: T[],
    getNew?: (value: string) => T,
    inline?: boolean
}

export function SelectorField<T>({control, name, label, getId, getDisplay, selectables, getNew, inline = false}: SelectorFieldProps<T>) {

    const isSelectedValue = (value: string, field) => {
        if (!field.value) return false;
        if (!Array.isArray(field.value)) {
            return getId(field.value) === value || getDisplay(field.value) === value;
        }

        return field.value.filter(item => getId(item) === value || getDisplay(item) === value).length > 0;
    }

    const onChange = (value: string, field) => {
        if (isSelectedValue(value, field)) {
            return
        }

        let item = selectables.find((i) => getId(i) === value);
        if (!item && !getNew) return

        if (!item && getNew) {
            item = getNew(value);
        }

        if (!Array.isArray(field.value)) {
            field.onChange(item)
        } else {
            field.onChange(field.value.concat([item]))
        }
    }

    const removeValue = (field) => {
        return (v: string) => {
            if (!Array.isArray(field.value)) {
                field.onChange(null)
                return
            }

            field.onChange(
                field.value.filter((item: T) => !(getDisplay(item) === v || getId(item) === v)),
            )
        }
    }

    const valueToOption = (value: T) => ({label: getDisplay(value), value: getId(value) });

    const selection = (field): Option | Option[] => {
        if (!field.value) return [];

        if (!Array.isArray(field.value)) {
            return valueToOption(field.value);
        }

        return field.value.map(valueToOption)
    }

    return (
            <FormItem className={cn(inline && "flex items-center gap-3")}>
              <Label>{label}</Label>
              <FormField
                control={control}
                name={name}
                render={({ field }) =>{
                    return <PopoverSelect
                        title='Sélection...'
                        selection={selection(field)}
                        choices={selectables.map(v => ({label: getDisplay(v), value: getId(v)}))}
                        selectValue={(id) => onChange(id, field)}
                        canCreate={getNew !== undefined}
                        removeValue={removeValue(field)}
                    />
                }}
              />
            </FormItem>
    )
}
