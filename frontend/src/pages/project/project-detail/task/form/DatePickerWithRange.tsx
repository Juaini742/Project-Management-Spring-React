import {format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Calendar} from "@/components/ui/calendar.tsx"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover.tsx"
import {useState} from "react";
import {Label} from "@/components/ui/label.tsx";

interface Props {
    className?: string;
    onChange: (dateRange: DateRange | undefined) => void;
}

export function DatePickerWithRange({className, onChange}: Props) {
    const [date, setDate] = useState<DateRange | undefined>(undefined)
    const handleChange = (currentDate: DateRange | undefined) => {
        setDate(currentDate)
        onChange(currentDate)
    }

    return (
        <div className={cn("grid gap-2 w-full", className)}>
            <Label>Deadline</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon/>
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={new Date()}
                        selected={date}
                        onSelect={handleChange}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
