import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import {Controller} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {getAllUserNotFriendEndpoint} from "@/lib/api.ts";
import {UserNotFriend} from "@/lib/interfaces.ts";
import EachElement from "@/components/EachElement.tsx";

interface Props {
    name: string
    control: any
}

export default function EmailInput({name, control}: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")
    const {data} = useQuery({
        queryFn: () => getAllUserNotFriendEndpoint(),
    })

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
                                ? data.find((user: UserNotFriend) => user.email === field.value).email
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
                                        of={data}
                                        render={(item: UserNotFriend) => (
                                            <CommandItem
                                                key={item.email}
                                                value={item.email}
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
                                                        field.value === item.email ? "opacity-100" : "opacity-0"
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