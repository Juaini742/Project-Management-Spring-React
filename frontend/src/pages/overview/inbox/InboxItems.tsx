import {useParams} from "react-router-dom";
import {user} from "@/data/data.json"
import PersonalMessage from "@/pages/overview/inbox/PersonalMessage.tsx";
import GroupMessage from "@/pages/overview/inbox/GroupMessage.tsx";

export default function InboxItems() {
    const param = useParams();
    const messages = user.chats.find(chat => chat.id === param.id);

    return (
        <div className="flex flex-col gap-2">
            {messages?.type === "GROUP" ?
                <GroupMessage messages={messages}/> :
                <PersonalMessage messages={messages}/>
            }
        </div>
    );
}