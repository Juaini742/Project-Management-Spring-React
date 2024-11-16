import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import EachElement from "@/components/EachElement.tsx";
import {Link} from "react-router-dom";
import {user} from "@/data/data.json"
import {Card} from "@/components/ui/card.tsx";
import InboxListHeader from "@/pages/overview/inbox/InboxListHeader.tsx";

export default function InboxList() {
    return (
        <div>
            <InboxListHeader/>
            <div className="flex mt-3 flex-col gap-2 lg:gap-4">
                <EachElement of={user.chats} render={(item, index) => {
                    const message = item.messages[item.messages.length - 1].message.length > 30 ? item.messages[item.messages.length - 1].message.substring(0, 30) + "..." : item.messages[item.messages.length - 1].message;
                    return (
                        <Card
                            className="w-full flex gap-2 items-center pl-2 border-none py-2 hover:bg-gray-100 transition-all duration-300"
                            key={index}>
                            <Avatar>
                                <AvatarImage
                                    src="https://res.cloudinary.com/dixdqxpza/image/upload/v1710201314/samples/shoe.jpg"
                                />
                                <AvatarFallback>{item.name}</AvatarFallback>
                            </Avatar>
                            <Link to={`/overview/inbox/${item.id}`} className="flex flex-col w-full">
                                <div className="flex justify-between">
                                    <h6 className="text-[10px]">{item.name}</h6>
                                    <span className="block w-10 text-[10px]">{item.time}12.00</span>
                                </div>
                                <p className="flex-1 text-mutedColor-1 text-[10px]">{message}</p>
                            </Link>
                        </Card>
                    )
                }}/>
            </div>
        </div>
    );
}