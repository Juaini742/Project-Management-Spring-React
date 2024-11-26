import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useState} from "react";
import {format} from "date-fns";


export default function EndDate({ onChange }: { onChange: (date: Date | undefined) => void }) {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select End Date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    defaultMonth={new Date()}
                    selected={date}
                    onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        onChange(selectedDate || undefined);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}