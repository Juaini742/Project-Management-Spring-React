import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTaskEndpoint} from "@/lib/api.ts";
import {useToast} from "@/hooks/use-toast.ts";


export default function useTaskDelete() {
    const {toast} = useToast()
    const queryClient = useQueryClient()
    const {isLoading, mutateAsync} = useMutation({
        mutationFn: (id: string) => deleteTaskEndpoint(id),
        onSuccess: async () => {
            toast({
                title: "Success",
                description: "Task deleted successfully",
            })
            await queryClient.invalidateQueries({queryKey: ["tasks"]})
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Deleting task failed, please try again",
            })
            console.log(error)
        }
    })

    return {isLoading, mutateAsync}
}