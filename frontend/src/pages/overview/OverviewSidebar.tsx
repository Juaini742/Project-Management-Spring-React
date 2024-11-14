import {MessageSquare, PencilRuler, SendHorizontal, UsersRound} from "lucide-react";
import EachElement from "@/components/EachElement.tsx";
import {Link, useLocation} from "react-router-dom";


export default function OverviewSidebar() {
    const menu = [
        {
            icon: <MessageSquare className="size-3"/>,
            name: "Inbox",
            path: "inbox"
        },
        {
            icon: <SendHorizontal className="size-3"/>,
            name: "Sent",
            path: "sent"
        },
        {
            icon: <UsersRound className="size-3"/>,
            name: "Group",
            path: "group"
        },
    ]
    const path = useLocation()
    const thirdSegment = path.pathname.split("/")[2];
    const current = thirdSegment === undefined || thirdSegment === "inbox" ? "inbox" : thirdSegment;

    return (
        <div className="flex flex-col w-full py-5 pl-5">
            <div className="flex gap-2 mb-4 items-center p-2 border-b">
                <PencilRuler className="size-3"/>
                <span className="text-xs">Compose</span>
            </div>
            <div className="flex flex-col gap-2">
                <EachElement of={menu} render={(item, index) => (
                    <Link key={index} to={item.path}
                          className={`flex gap-2 items-center hover:bg-gray-100 p-2 rounded-lg transition-all duration-300 
                        ${current === item.path ? "bg-primary text-white" : "text-mutedColor-1"}`}
                    >
                        {item.icon}
                        <span className="text-xs">{item.name}</span>
                    </Link>
                )}/>
            </div>
        </div>
    );
}