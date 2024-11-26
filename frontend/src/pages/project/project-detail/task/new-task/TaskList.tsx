import React from 'react';
import { Eye, Edit3 } from 'lucide-react';
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import {TaskDetailDialog} from "@/pages/project/project-detail/task/new-task/TaskDetailDialog.tsx";
import {Link} from "react-router-dom";

// Data hardcode
const tasks = [
    {
        id: "1",
        name: "Setup Database",
        status: "in_progress",
        priority: "high",
        deadline: "2024-12-01",
    },
    {
        id: "2",
        name: "Create API Endpoint",
        status: "not_started",
        priority: "medium",
        deadline: "2024-12-05",
    },
    {
        id: "3",
        name: "Build Frontend UI",
        status: "submitted_for_review",
        priority: "critical",
        deadline: "2024-11-30",
    },
];

const statusColors: { [key: string]: string } = {
    not_started: "bg-gray-200 text-gray-800",
    in_progress: "bg-blue-200 text-blue-800",
    submitted_for_review: "bg-yellow-200 text-yellow-800",
    completed: "bg-green-200 text-green-800",
    rejected: "bg-red-200 text-red-800",
};

const priorityColors: { [key: string]: string } = {
    low: "bg-green-200 text-green-800",
    medium: "bg-yellow-200 text-yellow-800",
    high: "bg-orange-200 text-orange-800",
    critical: "bg-red-200 text-red-800",
};

const TaskList: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task List</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">Task Name</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Priority</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Deadline</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{task.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Badge className={`${statusColors[task.status]} px-2 py-1 rounded`}>
                                    {task.status.replace(/_/g, " ")}
                                </Badge>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Badge className={`${priorityColors[task.priority]} px-2 py-1 rounded`}>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                </Badge>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{task.deadline}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center flex justify-center gap-2">
                                <TaskDetailDialog task={task} />
                                <Link to={`task-detail`}>click</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskList;
