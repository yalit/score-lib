import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../../shadcdn/components/ui/form";
import {Input} from "../../shadcdn/components/ui/input";
import {cn} from "../../shadcdn/lib/utils";

type TextInputProps = {
    control, name, label: string, description?: string, classname?: string,
}
export default function TextInput({control, name, label, description, classname}: TextInputProps) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("mb-3", classname)}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...field} type="text"/>
                    </FormControl>
                    {description && (
                        <FormDescription>
                            {description}
                        </FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
