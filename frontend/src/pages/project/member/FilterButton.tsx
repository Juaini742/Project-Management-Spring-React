import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ListFilter} from "lucide-react";


export default function FilterButton({setSelectedType}: { setSelectedType: (type: string) => void }) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <ListFilter className="size-5"/>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Search by</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => setSelectedType("name")}>Name</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType("email")}>Email</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedType("role")}>Role</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}