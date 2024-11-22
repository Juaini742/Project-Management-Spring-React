import EachElement from "@/components/EachElement.tsx";
import {NavLink} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {CircleUserRound, FolderKanban, House, Target} from "lucide-react";


export default function Sidebar({isVisible}: { isVisible: boolean }) {
    const routes = [
        {
            name: 'Home',
            path: '/',
            icon: <House className="text-2xl"/>
        }, {
            name: 'Overview',
            path: '/overview',
            icon: <Target className="text-2xl"/>
        },
        {
            name: 'Project',
            path: '/project',
            icon: <FolderKanban/>
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: <CircleUserRound/>
        },
    ]

    return (
        <div
            className={`w-[200px] h-full border border-r pl-5 transform ${isVisible ? 'translate-x-0' : '-translate-x-96'} transition-transform duration-300`}>
            <div className=" mt-5">
                <h1>Project Management</h1>
            </div>

            <div className="mt-10 w-full">
                <h6 className="text-mutedColor-1 ">Dashboard</h6>
                <div className="flex flex-col gap-2 w-full mt-2">
                    <EachElement of={routes} render={(item, index) => (
                        <NavLink to={item.path} key={index}>
                            <Button variant="ghost" className="rounded-l-lg rounded-r-none w-full flex justify-start">
                                {item.icon}
                                <span>{item.name}</span>
                            </Button>
                        </NavLink>

                    )}/>
                </div>
            </div>

            <div className="mt-10 w-full border-t">
                <h6 className="text-gray-400 mt-3">Project List</h6>
                <div className="flex flex-col gap-2 w-full mt-2">
                    <EachElement of={routes} render={(item, index) => (
                        <Button key={index} variant="ghost"
                                className="rounded-l-lg rounded-r-none w-full flex justify-start">
                            {item.icon}
                            <span>{item.name}</span>
                        </Button>
                    )}/>
                </div>
            </div>
        </div>
    );
}