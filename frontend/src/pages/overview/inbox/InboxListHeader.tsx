import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {EllipsisVertical} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Card} from "@/components/ui/card.tsx";
import OverviewSidebar from "@/pages/overview/OverviewSidebar.tsx";

export default function InboxListHeader() {

    return (
        <div>
            <Card className="border-none ">
                {/*<DropdownMenu>*/}
                {/*    <DropdownMenuTrigger>*/}
                {/*        <EllipsisVertical className="size-6"/>*/}
                {/*    </DropdownMenuTrigger>*/}
                {/*    <DropdownMenuContent className="mt-2">*/}
                {/*        <DropdownMenuItem>*/}
                {/*            Add friend*/}
                {/*        </DropdownMenuItem>*/}
                {/*        <Separator/>*/}
                {/*        <DropdownMenuItem>*/}
                {/*            New chats*/}
                {/*        </DropdownMenuItem>*/}
                {/*    </DropdownMenuContent>*/}
                {/*</DropdownMenu>*/}
                <div className="flex gap-2 w-full mb-2">
                    <OverviewSidebar/>
                </div>
            </Card>
        </div>
    )
}