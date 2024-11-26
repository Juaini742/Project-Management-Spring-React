import {Badge} from "@/components/ui/badge.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import EachElement from "@/components/EachElement.tsx";
import {useQuery} from "@tanstack/react-query";
import {getTaskProjectEndpoint} from "@/lib/api.ts";
import EmptyCard from "@/components/EmptyCard.tsx";
import {Clock, LayoutList, PlusCircle, User} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {AssignedToTask, ProjectInterface, TaskInterface} from "@/lib/interfaces.ts";
import DialogContainer from "@/components/DialogContainer.tsx";
import {calculateRemainingDeadline} from "@/lib/calculateRemainingDeadline.ts";
import TaskDetailsDialog from "@/pages/project/project-detail/task/TaskDetailsDialog.tsx";
import ButtonDeleteWithAlert from "@/components/ButtonDeleteWithAlert.tsx";
import useTaskDelete from "@/pages/project/project-detail/task/useTaskDelete.tsx";
import TaskForm from "@/pages/project/project-detail/task/form/TaskForm.tsx";
import TaskList from "@/pages/project/project-detail/task/new-task/TaskList.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

export default function TaskProjectItems({id, project}: { id: string | undefined; project?: ProjectInterface }) {
    const {isLoading: deleteLoading, mutateAsync} = useTaskDelete()
    const {data, isLoading} = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTaskProjectEndpoint(id),
    });


    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col space-y-4"
                    >
                        {/* Skeleton Header */}
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-6 w-12 rounded-full"/>
                            <Skeleton className="h-6 w-3/4"/>
                        </div>

                        {/* Skeleton Content */}
                        <Skeleton className="h-4 w-full mb-2"/>
                        <Skeleton className="h-4 w-2/3"/>

                        {/* Skeleton Assigned To */}
                        <div className="mt-4">
                            <Skeleton className="h-5 w-24 mb-2"/>
                            <div className="space-y-2">
                                {Array.from({length: 2}).map((_, userIndex) => (
                                    <div
                                        key={userIndex}
                                        className="flex items-center space-x-2 text-sm"
                                    >
                                        <Skeleton className="h-6 w-6 rounded-full"/>
                                        <Skeleton className="h-4 w-1/2"/>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skeleton Footer */}
                        <div className="flex justify-between items-center mt-auto">
                            <Skeleton className="h-6 w-16 rounded-md"/>
                            <Skeleton className="h-6 w-20 rounded-md"/>
                        </div>
                    </div>
                ))}
            </div>
        );
    }


    return (
        <ScrollArea className="h-[calc(100vh-100px)]">
            <div className="flex justify-between items-center mt-5">
                <h2 className="text-xl font-semibold mb-4">Tasks</h2>
                <DialogContainer
                    title={`Add new task on " ${project?.name} "`}
                    description="This form is used to add a new taskx   ."
                    content={
                        <TaskForm id={id}/>
                    }
                    button={
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Add Task
                        </Button>
                    }
                />
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.tasks.length === 0 ? (
                        <EmptyCard text="Task is empty"/>
                    ) : (
                        <EachElement
                            of={data?.tasks || []}
                            render={(task: TaskInterface) => {
                                const truncateDesc = task?.description?.length > 50 ? task?.description?.substring(0, 50) + "..." : task.description;
                                return (
                                    <div
                                        key={task?.id}
                                        className="dark:bg-gray-800 bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4"
                                    >
                                        {/* Task Header */}
                                        <div className="flex items-center space-x-2">
                                            <LayoutList className="text-red-600"/>
                                            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                                                {task?.name}
                                            </h3>
                                        </div>

                                        {/* Task Description */}
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {truncateDesc}
                                        </p>

                                        {/* Task Dates */}
                                        <div className="text-sm text-gray-800 dark:text-gray-400">
                                            <p>
                                                <strong>Start:</strong> {new Date(task.startDate).toLocaleString()}
                                            </p>
                                            <p>
                                                <strong>End:</strong> {new Date(task.endDate).toLocaleString()}
                                            </p>
                                            <p className="flex items-center space-x-2 text-red-600 mt-2">
                                                <Clock className="w-4 h-4"/>
                                                <span>Remaining: {calculateRemainingDeadline(task.endDate)}</span>
                                            </p>
                                        </div>

                                        {/* Assigned To */}
                                        <div className="mt-4">
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                                Assigned To:
                                            </p>
                                            <ul className="space-y-1">
                                                <EachElement
                                                    of={task.assignedTo}
                                                    render={(user: AssignedToTask, index: number) => (
                                                        <li key={index} className="flex items-center space-x-2 text-sm">
                                                            <User className="w-4 h-4 text-red-600"/>
                                                            <span className="text-gray-600 dark:text-gray-400">
                                                                {user.email}
                                                            </span>
                                                            <Badge variant={user.isDone ? "success" : "destructive"}>
                                                                {user.isDone ? "done" : "on going"}
                                                            </Badge>
                                                        </li>
                                                    )}
                                                />
                                            </ul>
                                        </div>


                                        {/* Task Footer */}
                                        <div className="flex justify-between items-center mt-auto">
                                            <Badge variant="outline" color="red">
                                                {task.status}
                                            </Badge>
                                            <div className="flex">
                                                <DialogContainer
                                                    button={
                                                        <Button variant="link" className="text-black dark:text-white">
                                                            View Details
                                                        </Button>}
                                                    content={<TaskDetailsDialog task={task}/>}
                                                />
                                                <ButtonDeleteWithAlert
                                                    isLoading={deleteLoading}
                                                    onDelete={async () => {
                                                        await mutateAsync(task.id);
                                                    }}
                                                    button={
                                                        <Button variant="link" className="text-red-600">
                                                            Delete
                                                        </Button>}
                                                    title="Delete Task"
                                                    desc="This action will delete the task permanently and cannot be undone."
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }}
                        />
                    )}
                </div>
                <TaskList />
            </div>
        </ScrollArea>
    );
}

