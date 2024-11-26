import {Card} from "@/components/ui/card.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge.tsx";
import {calculateRemainingDeadline} from "@/lib/calculateRemainingDeadline.ts";
import {ActivityIcon, CloudUploadIcon, FileIcon, PaperclipIcon, UserIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {ProjectInterface} from "@/lib/interfaces.ts";


interface Props {
    project: ProjectInterface | undefined;
    isLoading: boolean;
}

export default function OverviewProjectDetail({project, isLoading}: Props) {

    return (
        <>
            <Card className="w-full py-6 px-4 flex flex-col gap-6 rounded-lg bg-card border-none">
                <div className="p-3 space-y-6">
                    {/* Header */}
                    {isLoading ? (
                        <Skeleton className="h-10 w-[50%]"></Skeleton>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                                    {project?.name ?? "Loading..."}
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Project ID: {project?.id}
                                </p>
                            </div>

                            {/* Progress Bar & Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                                {/* Progress */}
                                <div className="border-r pr-4 border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
                                        Progress
                                    </h2>
                                    <Progress
                                        value={project?.progress}
                                        className="h-3 rounded-full bg-gray-200 dark:bg-gray-700"
                                    />
                                    <div className="flex items-center justify-between mt-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Est. Hours: <strong>{project?.estimated_hours ?? 0}h</strong>
                            </span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                Actual Hours: <strong>{project?.actual_hours ?? 0}h</strong>
                            </span>
                                    </div>
                                </div>

                                {/* Total Tasks */}
                                <div className="border-r pr-4 border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
                                        Total Tasks
                                    </h2>
                                    <div className="text-xl font-bold text-gray-800 dark:text-gray-100">
                                        15/20
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        Keep up the good work!
                                    </p>
                                </div>

                                {/* Start Date */}
                                <div className="border-r pr-4 border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
                                        Project Start
                                    </h2>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {project?.startDate
                                            ? format(new Date(project?.startDate), "PPP")
                                            : "Not Available"}
                                    </div>
                                </div>

                                {/* Due Date */}
                                <div className="">
                                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
                                        Due Date
                                    </h2>
                                    <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {project?.endDate
                                    ? format(new Date(project?.endDate), "PPP")
                                    : "Ongoing"}
                            </span>
                                        {project?.endDate && (
                                            <Badge
                                                className="ml-1 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-md">
                                                {calculateRemainingDeadline(project.endDate)}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>


            <div className="mt-5 flex gap-5 flex-col md:flex-row">
                <Card className="bg-card p-5 border-none flex-1 rounded-lg">
                    <div className="flex items-center space-x-3 mb-6">
                        <ActivityIcon className="text-red-500 w-6 h-6" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            Recent Activities
                        </h3>
                    </div>
                    <div className="space-y-6">
                        <ul className="space-y-4">
                            {/* Activity 1 */}
                            <li className="flex items-start space-x-4">
                                {/* Icon */}
                                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                {/* Details */}
                                <div>
                                    <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                            John Doe
                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            2 hours ago
                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Uploaded a new design file:{" "}
                                        <strong className="text-gray-800 dark:text-gray-200">
                                            design-mockup.jpg
                                        </strong>
                                    </p>
                                </div>
                            </li>

                            {/* Activity 2 */}
                            <li className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                            Jane Smith
                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            1 day ago
                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Created a task:{" "}
                                        <strong className="text-gray-800 dark:text-gray-200">
                                            Review project mockups
                                        </strong>
                                    </p>
                                </div>
                            </li>

                            {/* Activity 3 */}
                            <li className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                            Admin
                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            3 days ago
                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        Marked task{" "}
                                        <strong className="text-gray-800 dark:text-gray-200">
                                            Review project mockups
                                        </strong>{" "}
                                        as complete.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Card>


                <Card className="bg-card p-3 border-none flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                        <PaperclipIcon className="text-red-600"/>
                        <h3 className="text-lg font-semibold">Upload Files</h3>
                    </div>
                    <div
                        className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg">
                        <CloudUploadIcon className="text-red-600 w-10 h-10"/>
                        <p className="text-sm text-gray-600 dark:text-gray-400 ml-4">Drag your files
                            here or
                            click to browse</p>
                    </div>

                    {/* File List */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-semibold">Uploaded Files</span>
                            <Button variant="link" className="text-red-600">View All</Button>
                        </div>
                        <ul className="list-none space-y-3">
                            <li className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <FileIcon className="text-gray-500"/>
                                    <span
                                        className="text-sm text-gray-600 dark:text-gray-400">project-plan.pdf</span>
                                </div>
                                <Badge variant="outline" color="green"
                                       className="text-sm">Completed</Badge>
                            </li>
                            <li className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <FileIcon className="text-gray-500"/>
                                    <span
                                        className="text-sm text-gray-600 dark:text-gray-400">design-mockup.jpg</span>
                                </div>
                                <Badge variant="outline" color="yellow" className="text-sm">In
                                    Progress</Badge>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        </>
    )
}