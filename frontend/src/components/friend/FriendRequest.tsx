import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import ButtonDeleteWithAlert from "@/components/ButtonDeleteWithAlert.tsx";
import {useFriendPending} from "@/hooks/useFriendPending.ts";
import EachElement from "@/components/EachElement.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateFriendStatusEndpoint} from "@/lib/api.ts";
import {useToast} from "@/hooks/use-toast.ts";
import {FriendUpdate} from "@/lib/interfaces.ts";
import EmptyCard from "@/components/EmptyCard.tsx";

export default function FriendRequest() {
    const {toast} = useToast()
    const {friends} = useFriendPending()
    const queryClient = useQueryClient()
    const {isLoading, mutateAsync} = useMutation({
        mutationKey: ["friends"],
        mutationFn: async (data: FriendUpdate) => {
            console.log(data)
            await updateFriendStatusEndpoint(data)
        },
        onSuccess: () => {
            toast({
                title: "Success",
                description: "Friend request accepted successfully",
            });
            queryClient.invalidateQueries(["friends"]);
        },
        onError: () => {
            toast({
                title: "Error",
                description:
                    "Failed to accept friend request, please try again",
            })
        }

    })

    const handleStatusClick = (email: string, type: string) => {
        mutateAsync({
            email: email,
            status: type,
        });
    };

    return (
        <Card className="p-5">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Friend Request</h2>
            <ScrollArea className="h-[300px]">
                {friends?.friends.length === 0 ? (
                    <EmptyCard text="No friend requests at the moment." />
                ) : (
                    <div className="space-y-3 p-2">
                        <EachElement
                            of={friends?.friends || []}
                            render={(friend) => (
                                <Card key={friend.id} className="shadow-sm">
                                    <CardContent className="p-0">
                                        <div className="flex justify-between items-center p-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                    {friend.email}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{friend.email}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Badge variant="outline">
                                                    Pending
                                                </Badge>
                                                <ButtonDeleteWithAlert
                                                    label="Accep"
                                                    title="Are you sure you want to accept this friend request?"
                                                    desc="This action will accept the friend request"
                                                    onDelete={() => handleStatusClick(friend.email, "accepted")}
                                                    isLoading={isLoading}
                                                    button={
                                                        <Badge
                                                            className="cursor-pointer"
                                                            variant="success">
                                                            Accept
                                                        </Badge>
                                                    }
                                                />

                                                <ButtonDeleteWithAlert
                                                    label="Rejected"
                                                    title="Are you sure you want to reject this friend request?"
                                                    desc="This action will remove the friend request and prevent further communication."
                                                    onDelete={() => handleStatusClick(friend.email, "rejected")}
                                                    isLoading={isLoading}
                                                    button={
                                                        <Badge
                                                            className="bg-red-200 dark:bg-red-950 text-red-950 dark:text-red-500 cursor-pointer">
                                                            Decline
                                                        </Badge>
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        />
                    </div>
                )}
            </ScrollArea>
        </Card>
    );
}
