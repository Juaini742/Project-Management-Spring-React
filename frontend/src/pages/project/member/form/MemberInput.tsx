import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import {Controller} from "react-hook-form";
import EachElement from "@/components/EachElement.tsx";

interface UserAvailable {
    id: string;
    email: string
}

interface Props {
    name: string
    control: any
    members: UserAvailable[] | undefined
}

export default function MemberInput({name, control, members}: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")

    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                            {...field}
                        >
                            {field.value
                                ? members?.find((item: UserAvailable) => item?.id === field.value)?.email ?? "Select user..."
                                : "Select user..."}
                            <ChevronsUpDown className="opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                        <Command>
                            <CommandInput placeholder="Search user..." className="h-9 w-full block"/>
                            <CommandList>
                                <CommandEmpty>No user found.</CommandEmpty>
                                <CommandGroup>
                                    <EachElement
                                        of={members || []}
                                        render={(item: UserAvailable) => (
                                            <CommandItem
                                                key={item.id}
                                                value={item.id}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                    field.onChange(currentValue);
                                                }}
                                            >
                                                {item.email}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        field.value === item.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        )}
                                    />
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        />
    )
}