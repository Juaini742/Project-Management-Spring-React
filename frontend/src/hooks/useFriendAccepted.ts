import {UserFriend} from "@/lib/interfaces.ts";
import {create} from "zustand";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteFriendEndpoint, getAllUserFriendAccepted} from "@/lib/api.ts";
import {useToast} from "@/hooks/use-toast.ts";


interface FriendStore {
    friends: UserFriend | null;
    setFriends: (friends: UserFriend | null) => void;
}

const useFriendStore = create<FriendStore>((set) => ({
    friends: null,
    setFriends: (friends) => set({friends}),
}));

export const useFriendAccepted = () => {
    const {toast} = useToast();
    const {friends, setFriends} = useFriendStore();
    const queryClient = useQueryClient()
    const {isLoading} = useQuery({
        queryFn: getAllUserFriendAccepted,
        queryKey: ["friends"],
        onSuccess: (data: UserFriend) => {
            setFriends(data);
        },
        onError: (error: unknown) => {
            console.log(error);
        },
    });


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

    const handleDeleteFriend = async (id: string) => {
        await mutateAsync(id)
    };


    return {friends, isLoading, handleDeleteFriend};
}