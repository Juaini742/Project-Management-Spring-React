import {MessageSquare, PencilRuler, SendHorizontal, UsersRound} from "lucide-react";
import EachElement from "@/components/EachElement.tsx";
import {Link, useLocation} from "react-router-dom";


export default function OverviewSidebar() {
    const menu = [
        {
            icon: <MessageSquare className="size-3 md:size-5"/>,
            name: "Inbox",
            path: "inbox"
        },
        {
            icon: <SendHorizontal className="size-3 md:size-5"/>,
            name: "Sent",
            path: "sent"
        },
        {
            icon: <UsersRound className="size-3 md:size-5"/>,
            name: "Group",
            path: "group"
        },
    ]
    const path = useLocation()
    const thirdSegment = path.pathname.split("/")[2];
    const current = thirdSegment === undefined || thirdSegment === "inbox" ? "inbox" : thirdSegment;

    return (
            <EachElement of={menu} render={(item, index) => (
                <Link key={index} to={item.path}
                      className={`flex gap-2 items-center hover:underline p-2 transition-all duration-300 
                        ${current === item.path ? "text-black dark:text-white" : "text-mutedColor-1"}`}
                >
                    {/*{item.icon}*/}
                    <span className="text-xs md:text-base">{item.name}</span>
                </Link>
            )}/>
    );
}