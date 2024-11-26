import {ProjectInterface} from "@/lib/interfaces.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import useProjectMutation from "@/pages/project/useProjectMutation.ts";
import ButtonWithLoading from "@/components/ButtonWithLoading.tsx";
import EndDate from "@/pages/project/form/EndDate.tsx";
import StartDate from "@/pages/project/form/StartDate.tsx";
import {projectSchema, projectValues} from "@/lib/validation.ts";

interface Props {
    project: ProjectInterface | undefined;
    type: "create" | "update";
}

function ProjectForm({project, type}: Props) {
    const form = useForm<projectValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: type === "update" ? project?.name ?? "" : "",
            description: type === "update" ? project?.description ?? "" : "",
            startDate: type === "update" ? (project?.startDate ? new Date(project.startDate) : undefined) : undefined,
            endDate: type === "update" ? (project?.endDate ? new Date(project.endDate) : undefined) : undefined,
            category: type === "update" ? project?.category ?? "" : "",
            budget: type === "update" ? project?.budget ?? undefined : undefined,
            color: type === "update" ? project?.color ?? "#ffffff" : "#ffffff",
            tags: type === "update" ? project?.tag ?? "" : "",
        },
    });
    const {isLoading, mutateAsync} = useProjectMutation({type, project, form})

    const onSubmit = async (data: projectValues) => {
        await mutateAsync(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your project name"
                                    className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {/* Description Field */}
                <FormField
                    name="description"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your project description"
                                    className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="category"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your project category"
                                    className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex gap-2">

                    {/* Start Date */}
                    <FormField
                        name="startDate"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <StartDate
                                        onChange={(selectedDate) => field.onChange(selectedDate)}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                    {/* End Date */}
                    <FormField
                        name="endDate"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>End Date (optional)</FormLabel>
                                <FormControl>
                                    <EndDate onChange={field.onChange}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-2">
                    {/* Budget Field */}
                    <FormField
                        name="budget"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Budget (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter your budget"
                                        className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Tags */}
                    <FormField
                        name="tags"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Tags (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Add tags (e.g. marketing, dev)"
                                        className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-2">
                    {/* Budget Field */}
                    <FormField
                        name="estimated_hours"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Estimated Hours (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter your Estimated Hours"
                                        className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Tags */}
                    <FormField
                        name="actual_hours"
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Actual Hours (optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Enter your Actual Hours"
                                        className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-indigo-300"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                {/* Color Picker */}
                <FormField
                    name="color"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex flex-col gap-2">
                                    <FormLabel>Project Color (optional)</FormLabel>
                                    <input
                                        type="color"
                                        className="w-full h-10 border-none rounded-md"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-2">
                    <ButtonWithLoading
                        isLoading={isLoading}
                        label={type === "create" ? "Create" : "Update"}
                    />
                </div>
            </form>
        </Form>
    );
}
export default ProjectForm;
