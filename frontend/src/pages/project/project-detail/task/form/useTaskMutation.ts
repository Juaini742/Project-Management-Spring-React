import {useToast} from "@/hooks/use-toast.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {taskSchema, taskValues} from "@/lib/interfaces.ts";
import {taskPostEndpoint} from "@/lib/api.ts";
import {UseFormReturn} from "react-hook-form";
import zod from "zod";


export default function useTaskMutation(form: UseFormReturn<zod.infer<typeof taskSchema>>) {
    const {toast} = useToast()
    const queryClient = useQueryClient()
    const {isLoading, mutateAsync} = useMutation({
        mutationKey: ["task"],
        mutationFn: (data: taskValues) => taskPostEndpoint(data),
        onSuccess: async () => {
            toast({
                title: "Success",
                description: "Task added successfully",
            })
            form.reset()
            await queryClient.invalidateQueries({queryKey: ["tasks"]})
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Adding task failed, please try again",
            })
            console.log(error)
        }
    })

    return {isLoading, mutateAsync}
}