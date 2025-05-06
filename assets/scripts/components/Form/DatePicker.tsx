import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../../shadcdn/components/ui/form";
import {cn} from "../../shadcdn/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "../../shadcdn/components/ui/popover";
import {Button} from "../../shadcdn/components/ui/button";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "../../shadcdn/components/ui/calendar";

type TextInputProps = {
    control, name, label: string, description?: string, classname?: string,
}
export default function DatePicker({control, name, label, description, classname}: TextInputProps) {
    //TODO : translation
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-3 mb-4">
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "dd-MM-yyyy")
                                    ) : (
                                        <span>Choisis une date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}
