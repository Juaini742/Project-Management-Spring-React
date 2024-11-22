import {Badge} from "@/components/ui/badge.tsx";
import {useState} from "react";
import {Card} from "@/components/ui/card.tsx";
import FriendDialog from "@/components/friend/FriendDialog.tsx";
import DeleteFriendButton from "@/components/friend/DeleteFriendButton.tsx";
import {useFriendAccepted} from "@/hooks/useFriendAccepted.ts";
import EmptyCard from "@/components/EmptyCard.tsx";

export default function FriendList() {
    const {friends} = useFriendAccepted();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredFriends = friends?.friends.filter(friend =>
        friend.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card className="p-5">
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
            <EmptyCard text="Friends list is empty" />
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
                                    <DeleteFriendButton id={friend.id} />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className="mt-5">
                <FriendDialog/>
            </div>
        </Card>
    );
}