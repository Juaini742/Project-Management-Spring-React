import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getProjectByIdEndpoint} from "@/lib/api.ts";
import MainTemplate from "@/components/template/MainTemplate.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    ChevronsLeft, ClipboardList, Eye, Settings, User
} from "lucide-react";
import OverviewProjectDetail from "@/pages/project/project-detail/overview/OverviewProjectDetail.tsx";
import {useState} from "react";
import TaskProjectItems from "@/pages/project/project-detail/task/TaskProjectItems.tsx";
import MembersTableItems from "@/pages/project/member/MembersTableItems.tsx";
import EachElement from "@/components/EachElement.tsx";


const tabItems = [
    {
        key: "overview",
        label: "Overview",
        icon: <Eye size={18}/>,
        gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    },
    {
        key: "member",
        label: "Member",
        icon: <User size={18}/>,
        gradient: "bg-gradient-to-r from-teal-400 via-green-400 to-lime-500",
    },
    {
        key: "task",
        label: "Task",
        icon: <ClipboardList size={18}/>,
        gradient: "bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500",
    },
    {
        key: "setting",
        label: "Setting",
        icon: <Settings size={18}/>,
        gradient: "bg-gradient-to-r from-red-500 via-rose-500 to-pink-500",
    },
];


export default function ProjectDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const {data, isLoading} = useQuery({
        queryKey: ["project", id],
        queryFn: () => getProjectByIdEndpoint(id),
    });
    const project = data?.data


    return (
        <MainTemplate>
            <ScrollArea className="h-[calc(100vh-20px)]">
                <div className="container">
                    <div className="my-10 flex gap-2 items-center justify-between">
                        {/* Tabs */}
                        <div className="flex gap-2">
                            <EachElement
                                of={tabItems}
                                render={({key, label, icon, gradient}) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`${
                                            activeTab === key
                                                ? `${gradient} text-white shadow-lg`
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        } flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300`}
                                    >
                                        {icon}
                                        <span className="text-sm">{label}</span>
                                    </button>
                                )}
                            />
                        </div>

                        {/* Back Button */}
                        <Button
                            onClick={() => navigate(-1)}
                            variant="secondary"
                            className="sticky top-5 right-5 z-50 shadow-md flex items-center gap-2"
                        >
                            <ChevronsLeft/>
                            Back
                        </Button>
                    </div>
                    <div>
                        {activeTab === "overview" && <OverviewProjectDetail project={project} isLoading={isLoading}/>}
                        {activeTab === "member" && <MembersTableItems project={project} id={id}/>}
                        {activeTab === "task" && <TaskProjectItems id={id} project={project}/>}
                        {activeTab === "setting" && (
                            <div>
                                <p>Settings content goes here</p>
                            </div>
                        )}
                    </div>
                </div>
            </ScrollArea>
        </MainTemplate>

    );
}
