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

type FileInputProps = {
    control, name, label: string, description?: string, classname?: string,
}
export default function FileInput({control, name, label, description, classname}: FileInputProps) {
    const handleChange = (onChange, files: FileList|null) => {
        if (files) {
            onChange(Array.from(files))
        }
    }
    return (
        <FormField
            control={control}
            name={name}
            render={({field: { value, onChange, ...field } }) => (
                <FormItem className={cn("mb-3", classname)}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input {...field} type="file" multiple={true} onChange={(e) => handleChange(onChange, e.target.files)}/>
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
