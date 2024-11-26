import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

type Task = {
    id: string;
    name: string;
    description: string;
    status: string;
    priority: string;
    deadline: string;
};

interface TaskDetailDialogProps {
    task: Task;
}

export const TaskDetailDialog: React.FC<TaskDetailDialogProps> = ({ task }) => {
    const statusColors = {
        not_started: "bg-gray-200 text-gray-800",
        in_progress: "bg-blue-200 text-blue-800",
        submitted_for_review: "bg-yellow-200 text-yellow-800",
        completed: "bg-green-200 text-green-800",
        rejected: "bg-red-200 text-red-800",
    };

    const priorityColors = {
        low: "bg-green-200 text-green-800",
        medium: "bg-yellow-200 text-yellow-800",
        high: "bg-orange-200 text-orange-800",
        critical: "bg-red-200 text-red-800",
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-blue-600 hover:underline">View Details</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Task Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold">Task Name</h3>
                        <p>{task.name}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Description</h3>
                        <p>{task.description || "No description provided."}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Status</h3>
                        <Badge className={`${statusColors[task.status]} px-2 py-1 rounded`}>
                            {task.status.replace(/_/g, " ")}
                        </Badge>
                    </div>
                    <div>
                        <h3 className="font-semibold">Priority</h3>
                        <Badge className={`${priorityColors[task.priority]} px-2 py-1 rounded`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </Badge>
                    </div>
                    <div>
                        <h3 className="font-semibold">Deadline</h3>
                        <p>{task.deadline}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
