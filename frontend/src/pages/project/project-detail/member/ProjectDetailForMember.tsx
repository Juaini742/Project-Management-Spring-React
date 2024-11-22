import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Card, CardHeader, CardContent} from "@/components/ui/card.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import MainTemplate from "@/components/template/MainTemplate.tsx";
import {
    CalendarIcon,
    Check, ChevronsLeft,
    Info,
    MessageSquare,
} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import AssignedTask from "@/pages/project/project-detail/AssignedTask.tsx";
import ProgressOverview from "@/pages/project/project-detail/ProgressOverview.tsx";
import FieldUpload from "@/pages/project/project-detail/FieldUpload.tsx";
import ActivityLog from "@/pages/project/project-detail/ActivityLog.tsx";
import {useNavigate} from "react-router-dom";

export default function ProjectDetailForMember() {
    const navigate = useNavigate()
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
                        className="relative w-full h-40 bg-gradient-to-r from-red-600 to-red-400 dark:from-red-800 dark:to-red-600">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white px-6">
                                <h1 className="text-4xl font-bold">Project Name</h1>
                                <p className="text-sm mt-2">A brief description of the project goes here.</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 flex gap-5 w-full">
                        {/* Calendar */}
                        <div className="hidden md:block">
                            <Card>
                                <CardHeader className="flex items-center gap-2">
                                    <CalendarIcon className="w-5 h-5 text-gray-700 dark:text-gray-400"/>
                                    <h3 className="text-lg font-semibold">Project Timeline</h3>
                                </CardHeader>
                                <CardContent className="flex justify-center">
                                    <Calendar className="border border-gray-300 rounded-lg"/>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Project Details + Comments */}
                        <div className="flex-1 col-span-2 space-y-6">
                            {/* Project Details */}
                            <section>
                                <h2 className="text-xl font-semibold mb-4">Details</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-5 h-5 text-red-600"/>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Deadline: <Badge
                                            className="ml-1 bg-red-500 text-white">30th Nov 2024</Badge>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-green-600"/>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Status: <Badge className="ml-1 bg-green-500 text-white">Ongoing</Badge>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Info className="w-5 h-5 text-blue-600"/>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Owner: <Badge className="ml-1 bg-blue-500 text-white">John Doe</Badge>
                                        </span>
                                    </div>
                                </div>
                            </section>

                            {/* Comments */}
                            <section>
                                <h2 className="text-xl font-semibold mb-4">Comments</h2>
                                <Card className="space-y-4 p-4">
                                    {/* Comment Input */}
                                    <div className="flex items-start gap-4">
                                        <Avatar>
                                            <AvatarImage src="https://via.placeholder.com/40" alt="User Avatar"/>
                                        </Avatar>
                                        <div className="w-full">
                                            <Textarea
                                                placeholder="Add your comment..."
                                                className="resize-none"
                                            />
                                            <Button variant="default" className="mt-2 flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4"/>
                                                Post Comment
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Example Comments */}
                                    <div className="space-y-3">
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                <span
                                                    className="font-semibold text-gray-800 dark:text-white">John Doe:</span>{" "}
                                                Great progress on this project so far!
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Posted on: 18th
                                                Nov</p>
                                        </div>
                                    </div>
                                </Card>
                            </section>
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

                </div>
            </ScrollArea>
        </MainTemplate>
    );
}
