import {UserFriend} from "@/lib/interfaces.ts";
import {create} from "zustand";
import {useQuery} from "@tanstack/react-query";
import {getAllUserFriendPending} from "@/lib/api.ts";


interface FriendStore {
    friends: UserFriend | null;
    setFriends: (friends: UserFriend | null) => void;
}

const useFriendStore = create<FriendStore>((set) => ({
    friends: null,
    setFriends: (friends) => set({friends}),
}));

export const useFriendPending = () => {
    const {friends, setFriends} = useFriendStore();
    const {isLoading} = useQuery({
        queryFn: getAllUserFriendPending,
        queryKey: ["friends"],
        onSuccess: (data: UserFriend) => {
            setFriends(data);
        },
        onError: (error: unknown) => {
            console.log(error);
        },
    });

    return {friends, isLoading};
}