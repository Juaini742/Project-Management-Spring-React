import {Badge} from "@/components/ui/badge.tsx";
import {useState} from "react";
import {Card} from "@/components/ui/card.tsx";
import {useFriendAccepted} from "@/hooks/useFriendAccepted.ts";
import EmptyCard from "@/components/EmptyCard.tsx";
import DialogContainer from "@/components/DialogContainer.tsx";
import {PlusCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import ProjectForm from "@/components/friend/FriendForm.tsx";
import ButtonDeleteWithAlert from "@/components/ButtonDeleteWithAlert.tsx";

export default function FriendList() {
    const {friends, handleDeleteFriend} = useFriendAccepted();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredFriends = friends?.friends.filter(friend =>
        friend.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card className="p-5 bg-none border-none">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Friend List</h2>
            <div className="mb-4 w-full">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="p-2 w-full rounded-lg border border-gray-300 dark:border-red-800 dark:bg-red-950/15 dark:text-white outline-none"
                />
            </div>

            {filteredFriends && filteredFriends.length === 0 ? (
                <EmptyCard text="Friends list is empty"/>
            ) : (
                <div className="overflow-y-auto max-h-[400px]">
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-100 dark:bg-red-700">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Email</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-gray-200">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredFriends && filteredFriends.map(friend => (
                            <tr key={friend.id} className="border-t dark:border-gray-600">
                                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-100">{friend.email}</td>
                                <td className="px-4 py-2 text-sm">
                                    <Badge variant="secondary">{friend.status}</Badge>
                                </td>
                                <td className="px-4 py-2 text-sm">
                                    <ButtonDeleteWithAlert
                                        label="Delete"
                                        title="Are you sure, you want to delete this from your friend lists?"
                                        desc="This action cannot be undone. This will permanently delete your friend relationship and remove your data from our servers."
                                        onDelete={() => handleDeleteFriend(friend.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-5">
                <DialogContainer
                    title="Add Friend"
                    description="Please search user by email with input bellow"
                    button={
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Add Friend
                        </Button>
                    }
                    content={<ProjectForm/>}
                />
            </div>
        </Card>
    );
}