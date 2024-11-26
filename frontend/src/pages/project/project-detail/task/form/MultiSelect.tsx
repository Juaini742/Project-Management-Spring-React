import {useState} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useProjectMember} from "@/hooks/useProjectMember.ts";
import EachElement from "@/components/EachElement.tsx";


interface MultiSelectProps {
    id: string | undefined
    selectedValues: string[];
    onChange: (values: string[]) => void;
}

export default function MultiSelect({id, selectedValues, onChange}: MultiSelectProps) {
    const [_currentSelection, setCurrentSelection] = useState<string>("");
    const {members} = useProjectMember(id)

    const addValue = (value: string) => {
        if (!selectedValues.includes(value)) {
            const newValues = [...selectedValues, value];
            onChange(newValues);
        }
    };

    const removeValue = (value: string) => {
        const newValues = selectedValues.filter((v) => v !== value);
        onChange(newValues);
    };

    console.log(members)

    return (
        <div className="space-y-2">
            <Select
                onValueChange={(value) => {
                    setCurrentSelection(value);
                    addValue(value);
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select users to assign"/>
                </SelectTrigger>
                <SelectContent>
                    <EachElement
                        of={members?.data || []}
                        render={(member) => (
                            <SelectItem key={member?.id} value={member?.email}>
                                {member.email}
                            </SelectItem>
                        )}
                    />
                </SelectContent>
            </Select>

            <div className="flex flex-wrap gap-2">
                {selectedValues.map((value) => (
                    <Badge
                        key={value}
                        variant="secondary"
                        className="flex items-center space-x-2"
                    >
                        <span>{members?.data?.find((member) => member?.email === value)?.email || value}</span>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeValue(value)}
                            className="p-0 text-red-500"
                        >
                            ×
                        </Button>
                    </Badge>
                ))}
            </div>
        </div>
    );
}