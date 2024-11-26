import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import MemberInput from "@/pages/project/member/form/MemberInput.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { getAvailableUserForProjectEndpoint, projectMemberPostEndpoint} from "@/lib/api.ts";
import {useToast} from "@/hooks/use-toast.ts";
import ButtonWithLoading from "@/components/ButtonWithLoading.tsx";
import {projectMemberSchema, projectMemberValues} from "@/lib/validation.ts";

export default function ProjectMemberForm({project}: { project: { id: string, name: string }; }) {
    const {toast} = useToast()
    const {data} = useQuery({
        queryFn: () => getAvailableUserForProjectEndpoint(project.id),
    })
    const queryClient = useQueryClient()
    const form = useForm<projectMemberValues>({
        resolver: zodResolver(projectMemberSchema),
        defaultValues: {
            "memberId": "",
            "projectId": project?.id,
            "role": ""
        },
    });
    const {isLoading, mutateAsync} = useMutation({
        mutationFn: async (data: projectMemberValues) => {
            await projectMemberPostEndpoint(data)
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Member added successfully",
            })
            form.reset()
            queryClient.invalidateQueries({queryKey: ["members"]})
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error?.response?.data?.error || "An error occurred"
            })

            console.error(error)
        },
    })

    const onSubmit = async (data: projectMemberValues) => {
        await mutateAsync(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <div>
                    <Label>Member</Label>
                    <MemberInput name="memberId" control={form.control} members={data}/>
                </div>

                <FormField
                    name="role"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choice the role of member"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="MANAGER">Manager</SelectItem>
                                    <SelectItem value="DEVELOPER">Developer</SelectItem>
                                    <SelectItem value="TESTER">Tester</SelectItem>
                                    <SelectItem value="VIEWER">Viewer</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="mt-2 w-full">
                    <ButtonWithLoading
                        label="Add new member"
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </Form>
    )
};