import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import FriendList from "@/components/friend/FriendList.tsx";
import FriendRequest from "@/components/friend/FriendRequest.tsx";


export default function FriendContainer() {
    return (
        <Tabs defaultValue="friend-list" className="w-full flex flex-col items-center">
            <TabsList>
                <TabsTrigger value="friend-list">Friend List</TabsTrigger>
                <TabsTrigger value="friend-request">Friend Request</TabsTrigger>
            </TabsList>
            <TabsContent value="friend-list" className="w-full">
                <FriendList/>
            </TabsContent>
            <TabsContent value="friend-request" className="w-full">
                <FriendRequest />
            </TabsContent>
        </Tabs>
    )
}