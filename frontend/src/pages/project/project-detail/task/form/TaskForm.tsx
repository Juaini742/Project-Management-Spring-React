import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import ButtonWithLoading from "@/components/ButtonWithLoading.tsx";
import MultiSelect from "@/pages/project/project-detail/task/form/MultiSelect.tsx";
import {DatePickerWithRange} from "@/pages/project/project-detail/task/form/DatePickerWithRange.tsx";
import {DateRange} from "react-day-picker";
import useTaskMutation from "@/pages/project/project-detail/task/form/useTaskMutation.ts";
import {taskSchema, taskValues} from "@/lib/validation.ts";

export default function TaskForm({id}: { id: string | undefined }) {
    const form = useForm<taskValues>({
        defaultValues: {
            projectId: id ?? "",
            name: "",
            description: "",
            status: "TODO",
            priority: "LOW",
            startDate: new Date(),
            endDate: new Date(),
            assignedTo: []
        },
        resolver: zodResolver(taskSchema),
    })
    const {isLoading, mutateAsync} = useTaskMutation(form)
    const {setValue} = form;
    const handleDateChange = (dateRange: DateRange | undefined) => {
        if (dateRange?.from && dateRange?.to) {
            setValue("startDate", dateRange.from);
            setValue("endDate", dateRange.to);
        }
    };

    const onSubmit = async (data: taskValues) => {
        await mutateAsync(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <FormField
                    name="name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Task Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the task name here" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the task description here" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="priority"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Priority Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choice the priority level of the task"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    name="assignedTo"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Assigned To</FormLabel>
                            <FormControl>
                                <MultiSelect
                                    id={id}
                                    selectedValues={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <DatePickerWithRange onChange={handleDateChange}/>

                <ButtonWithLoading
                    label="Create task"
                    isLoading={isLoading}
                />
            </form>
        </Form>
    )
}
