import {useTranslator} from "../../hooks/useTranslator";
import {FormField, FormItem} from "../../shadcdn/components/ui/form";
import {cn} from "../../shadcdn/lib/utils";
import {Label} from "../../shadcdn/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../shadcdn/components/ui/select";

type SelectableTextChoiceProps = {
    control,
    name: string,
    label: string,
    choices: string[],
    placeholder: string,
    className?: string,
}

export function SelectableTextChoices({control, name, label, placeholder, choices, className = ""}: SelectableTextChoiceProps) {
    const {trans} = useTranslator()

    return (
        <FormItem className={cn("flex gap-2 items-center", className)}>
            <Label>{label}</Label>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {choices.map(c => (
                                <SelectItem key={c} value={c}>{trans(c)}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
        </FormItem>
    )
}
