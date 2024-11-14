import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import EachElement from "@/components/EachElement.tsx";
import {Link} from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {EllipsisVertical} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {user} from "@/data/data.json"
import {Card} from "@/components/ui/card.tsx";

export default function LeftContent() {
    return (
        <div className="flex flex-col gap-2">
            <Card className="flex justify-end items-center gap-3 bg-gray-100 dark:bg-black rounded py-2 border-none">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical className="size-6"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2">
                        <DropdownMenuItem>
                            Add friend
                        </DropdownMenuItem>
                        <Separator/>
                        <DropdownMenuItem>
                            New chats
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Card>
            <EachElement of={user.chats} render={(item, index) => {
                const message = item.messages[item.messages.length - 1].message.length > 22 ? item.messages[item.messages.length - 1].message.substring(0, 30) + "..." : item.messages[item.messages.length - 1].message;
                return (
                    <Card
                        className="w-full flex gap-2 items-center pl-2 border-none py-1 hover:bg-gray-100 transition-all duration-300"
                        key={index}>
                        <Avatar>
                            <AvatarImage
                                src="https://res.cloudinary.com/dixdqxpza/image/upload/v1710201314/samples/shoe.jpg"
                            />
                            <AvatarFallback>{item.name}</AvatarFallback>
                        </Avatar>
                        <Link to={`/overview/inbox/${item.id}`} className="flex justify-between w-full text-sm">
                            <div className="flex-1">
                                <h6 className="text-[11px]">{item.name}</h6>
                                <p className="text-mutedColor-1 text-[10px]">{message}</p>
                            </div>
                            <span className="block w-10 text-[11px]">{item.time}12.00</span>
                        </Link>
                    </Card>
                )
            }}/>
        </div>
    );
}