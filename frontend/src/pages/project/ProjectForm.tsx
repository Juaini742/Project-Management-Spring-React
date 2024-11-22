import {ProjectInterface, projectSchema, projectValues} from "@/lib/interfaces.ts";
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


interface Props {
    project: ProjectInterface | undefined;
    type: "create" | "update";
}

function ProjectForm({project, type}: Props) {
    const form = useForm<projectValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: project?.name ?? "",
            description: project?.description ?? "",
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your project name"
                                    {...field}
                                />
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
                                <Input
                                    type="text"
                                    placeholder="Enter your description"
                                    {...field}
                                />
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
