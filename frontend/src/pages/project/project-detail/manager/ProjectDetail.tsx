import MainTemplate from "@/components/template/MainTemplate.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {ChevronsLeft, CloudUploadIcon, FileIcon, PaperclipIcon} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {getProjectByIdEndpoint} from "@/lib/api.ts";
import MembersTableItems from "../../member/MembersTableItems.tsx";
import TaskProjectItems from "@/pages/project/task/TaskProjectItems.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import AssignedTask from "@/pages/project/project-detail/AssignedTask.tsx";
import ProgressOverview from "@/pages/project/project-detail/ProgressOverview.tsx";
import FieldUpload from "@/pages/project/project-detail/FieldUpload.tsx";
import ActivityLog from "@/pages/project/project-detail/ActivityLog.tsx";

export default function ProjectDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {data: project, isLoading} = useQuery({
        queryKey: ["project", id],
        queryFn: () => getProjectByIdEndpoint(id),
    });

    return (
        <MainTemplate>
            <ScrollArea className="h-[calc(100vh-20px)]">
                <Button onClick={() => navigate(-1)} variant="secondary"
                        className="absolute top-5 right-5 z-50 shadow-md">
                    <ChevronsLeft/>
                    Back
                </Button>
                <div className="p-0">
                    {/* Banner Section */}
                    <div
                        className="relative w-full h-64 bg-gradient-to-r from-red-600 to-red-400 dark:from-red-800 dark:to-red-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {isLoading ? (
                                <Skeleton className="h-10 w-[50%]"></Skeleton>
                            ) : (
                                <div className="text-center text-white px-6">
                                    <h1 className="text-4xl font-bold">{project?.name ?? "Loading..."}</h1>
                                    <p className="text-sm mt-2">
                                        {project?.description ?? "No description available"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Project ID: {project?.id}
                            </p>

                        </div>

                        {/* Members Table */}
                        <div className="mb-6">
                            <MembersTableItems project={project} id={id}/>
                        </div>

                        {/* Tasks Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <TaskProjectItems id={id}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 mb-10">
                    {/* Assigned Tasks */}
                    <AssignedTask/>
                    {/* Progress Overview */}
                    <ProgressOverview/>
                    {/* file upload */}
                    <FieldUpload/>
                    {/* Activity Log */}
                    <ActivityLog/>
                </div>
            </ScrollArea>
        </MainTemplate>
    );
}
