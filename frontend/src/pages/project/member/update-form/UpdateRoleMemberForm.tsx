import {Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {ProjectMember} from "@/lib/interfaces.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateMemberRoleEndpoint} from "@/lib/api.ts";
import {useToast} from "@/hooks/use-toast.ts";
import ButtonWithLoading from "@/components/ButtonWithLoading.tsx";
import {projectMemberUpdateSchema, projectMemberUpdateValues} from "@/lib/validation.ts";

export default function UpdateRoleMemberForm({member}: { member: ProjectMember }) {
    const {toast} = useToast()
    const queryClient = useQueryClient()
    const form = useForm<projectMemberUpdateValues>({
        resolver: zodResolver(projectMemberUpdateSchema),
        defaultValues: {
            "role": member.role
        },
    });
    const {isLoading, mutateAsync} = useMutation({
        mutationFn: async (data: projectMemberUpdateValues) => {
            await updateMemberRoleEndpoint(data, member.id)
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Member updated successfully",
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

    const onSubmit = async (data: projectMemberUpdateValues) => {
        await mutateAsync(data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
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
                        label="Update member role"
                        isLoading={isLoading}
                    />
                </div>
            </form>
        </Form>
    )
};