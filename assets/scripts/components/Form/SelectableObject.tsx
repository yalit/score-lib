import { FormField, FormItem } from "../../shadcdn/components/ui/form";
import { Label } from "../../shadcdn/components/ui/label";
import MultipleSelector from "../../shadcdn/components/ui/multipleSelector";

type SelectableObjectProps<T> = {
    control, name, 
    label: string, 
    getId: (v: T) => string, 
    getDisplay: (v: T) => string, 
    selectables: T[]
}

export function SelectableObject<T>({control, name, label, getId, getDisplay, selectables}: SelectableObjectProps<T>) {

    return (
            <FormItem>
              <Label>{label}</Label>
              <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <ObjectSelector 

                    />
                )}
              />
            </FormItem>
    )
}
