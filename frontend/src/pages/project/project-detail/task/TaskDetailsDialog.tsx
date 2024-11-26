import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {TaskInterface} from "@/lib/interfaces.ts";
import {CalendarDays, Clock, LayoutList, User} from "lucide-react";
import {format} from "date-fns";
import {Badge} from "@/components/ui/badge.tsx";
import {calculateRemainingDeadline} from "@/lib/calculateRemainingDeadline.ts";

export default function TaskDetailsDialog({task}: { task: TaskInterface }) {

    return (
        <Card className="border-none bg-transparent p-0 shadow-none">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <LayoutList className="text-red-600"/>
                    <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {task?.name}
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                {/* Task Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {task.description}
                </p>

                {/* Calendar Dates */}
                <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                        <CalendarDays className="w-5 h-5 text-red-600"/>
                        <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                                Start Date
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {format(task.startDate, "PPP")}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CalendarDays className="w-5 h-5 text-red-600"/>
                        <div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
                                End Date
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {format(task.endDate, "PPP")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Remaining Time */}
                <div className="flex items-center space-x-2 mb-6">
                    <Clock className="w-5 h-5 text-red-600"/>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Time Remaining:
                    </p>
                    <Badge variant="outline" color="red">
                        {calculateRemainingDeadline(task.endDate)}
                    </Badge>
                </div>

                {/* Assigned Users */}
                <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
                        Assigned To:
                    </p>
                    <ul className="space-y-2">
                        {task.assignedTo.map((user, index) => (
                            <li
                                key={index}
                                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                            >
                                <User className="w-4 h-4 text-red-600"/>
                                <span>{user?.email}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Task Status and Priority */}
                <div className="flex justify-between items-center mt-6">
                    <Badge
                        variant="outline"
                        color={
                            task.status === "DONE"
                                ? "green"
                                : task.status === "IN PROGRESS"
                                    ? "yellow"
                                    : "red"
                        }
                    >
                        {task.status}
                    </Badge>
                    <Badge variant="outline" color="red">
                        Priority: {task.priority}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}