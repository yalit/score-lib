import { FormField, FormItem } from "../../shadcdn/components/ui/form";
import { Label } from "../../shadcdn/components/ui/label";
import MultipleSelector from "../../shadcdn/components/ui/multipleSelector";

type MultipleSelectorFieldProps<T> = {
    control, name, 
    label: string, 
    getId: (v: T) => string, 
    getDisplay: (v: T) => string, 
    selectables: T[],
    getNew: (inputValue: string) => T,
}

export function MultipleSelectorField<T>({control, name, label, getId, getDisplay, selectables, getNew}: MultipleSelectorFieldProps<T>) {

    return (
            <FormItem>
              <Label>{label}</Label>
              <FormField
                control={control}
                name={name}
                render={({ field }) => (
                  <MultipleSelector<T>
                    values={field.value}
                    setValue={field.onChange}
                    displayValue={getDisplay}
                    idValue={getId}
                    selectables={selectables}
                    getNew={getNew}
                  />
                )}
              />
            </FormItem>
    )
}
