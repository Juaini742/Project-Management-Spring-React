import LeftContent from "@/pages/overview/inbox/InboxList.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Outlet} from "react-router-dom";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";


export default function OverviewInbox() {


    return (
        <div className="flex gap-5 h-full">
            <ScrollArea className="w-1/4 h-full py-5 pl-5">
                <LeftContent/>
            </ScrollArea>
            <div className="flex-1 flex flex-col border-l">
                <div className="w-full flex gap-2 items-center border-b p-2">
                    <Avatar>
                        <AvatarImage
                            src="https://res.cloudinary.com/dixdqxpza/image/upload/v1710201314/samples/shoe.jpg"/>
                        <AvatarFallback>asd</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">Nama personal or group</span>
                </div>
                <ScrollArea className="flex-1 px-5 py-2">
                    <Outlet/>
                </ScrollArea>
                <form className="h-10 p-1 flex gap-2 items-center border-t shadow">
                    <input className="w-full h-full px-2 outline-none"/>
                    <Button >Sent</Button>
                </form>
            </div>
        </div>
    )
}