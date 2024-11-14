import {Moon, PanelRight, Slash, Sun} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Button} from "@/components/ui/button.tsx";
import EachElement from "@/components/EachElement.tsx";
import {useUser} from "@/hooks/useUser.tsx";
import useDarkModeStore from "@/hooks/darkModeStore.ts";
import {useEffect} from "react";

interface Props {
    toggle: () => void;
}

export default function Header({toggle}: Props) {
    const {logout} = useUser()
    const path = useLocation();
    const current = path.pathname.split("/").filter(Boolean);
    const {toggleDarkMode, darkMode} = useDarkModeStore()

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode])

        return (
            <header className="h-16 w-full flex justify-between items-center gap-2 border-b px-5">
                <div className="flex items-center">
                    <button onClick={toggle} className="mr-4">
                        <PanelRight className="size-5"/>
                    </button>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <h1 className="text-mutedColor-1">App</h1>
                            </BreadcrumbItem>
                            <EachElement of={current.length > 1 ? current.slice(0, current.length - 1) : current}
                                         render={(item, index) => (
                                             <BreadcrumbItem key={index}>
                                                 <BreadcrumbSeparator>
                                                     <Slash/>
                                                 </BreadcrumbSeparator>
                                                 <BreadcrumbLink href={item} className="text-mutedColor-1">
                                                     {item}
                                                 </BreadcrumbLink>
                                             </BreadcrumbItem>
                                         )}/>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div>
                    <div className="flex items-center gap-3">
                        <div>
                            <button onClick={() => toggleDarkMode()}>{darkMode ? <Sun/> : <Moon/>} </button>
                        </div>
                        <span className="font-semibold">John Doe</span>
                        <DropdownMenu>

                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage
                                        src="https://res.cloudinary.com/dixdqxpza/image/upload/v1710201314/samples/shoe.jpg"/>
                                    <AvatarFallback>Profile</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="mr-5 mt-1">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <Link to="/profile">
                                    <DropdownMenuItem>
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                                <Link to="/profile">
                                    <DropdownMenuItem>
                                        Notification
                                    </DropdownMenuItem>
                                </Link>
                                <Button onClick={() => logout()} variant="destructive"
                                        className="w-full h-8 mt-3">Logout</Button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

            </header>
        )
    }