import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteFriendEndpoint} from "@/lib/api.ts";
import {useToast} from "@/hooks/use-toast.ts";
import ButtonDeleteWithAlert from "@/components/ButtonDeleteWithAlert.tsx";

export default function DeleteFriendButton({id}: { id: string }) {
    const {toast} = useToast();
    const queryClient = useQueryClient()
    const {mutateAsync} = useMutation({
        mutationKey: ["friends"],
        mutationFn: async (data: string) => {
            await deleteFriendEndpoint(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["friends"]);
            toast({
                title: "Success",
                description: "Friend deleted successfully",
            })
        },
        onError: (error) => {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to delete Friend, please try again",
            })
        },
    })

    const handleDeleteFriend = () => {
        mutateAsync(id)
    };

    return (
        <ButtonDeleteWithAlert
            label="Delete"
            title="Are you sure, you want to delete this from your friend lists?"
            desc="This action cannot be undone. This will permanently delete your friend relationship and remove your data from our servers."
            onDelete={handleDeleteFriend}
        />
    );
}

