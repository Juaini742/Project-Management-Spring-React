import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, CheckCircle, Clock, FileText, Text, User, X} from "lucide-react";
import {Card} from "@/components/ui/card.tsx";
import {Avatar} from "@/components/ui/avatar.tsx";

// {
//     "status": "SUCCESS",
//     "data": {
//     "id": "1",
//         "name": "Build API Endpoints",
//         "description": "Develop secure and scalable endpoints for the application.",
//         "status": "in_progress",
//         "priority": "high",
//         "deadline": "2024-12-05T00:00:00Z",
//         "assignees": [
//         { "id": "u1", "name": "Alice Doe" },
//         { "id": "u2", "name": "John Smith" }
//     ],
//         "checklist": [
//         { "id": "1", "name": "Set up API routes", "is_done": true, "completed_at": "2024-11-01T00:00:00Z" },
//         { "id": "2", "name": "Implement authentication", "is_done": false },
//         { "id": "3", "name": "Write API documentation", "is_done": false }
//     ],
//         "completion": {
//         "is_done": false,
//             "completed_at": null,
//             "is_late": false,
//             "completed_by": null
//     },
//     "history": [
//         { "action": "Assigned", "user": "Manager", "timestamp": "2024-11-01T00:00:00Z" },
//         { "action": "Status Updated", "user": "Alice Doe", "timestamp": "2024-11-10T00:00:00Z" }
//     ],
//         "review": {
//         "status": "pending",
//             "comments": "Looks good, but needs more testing.",
//             "reviewed_at": null,
//             "reviewed_by": null
//     },
//     "files": [
//         { "id": "f1", "name": "API_Documentation.pdf", "uploaded_by": "Alice Doe", "uploaded_at": "2024-11-10T00:00:00Z" }
//     ]
// }
// }


export default function TaskDetailPage() {
    const task = {
        id: "1",
        name: "Build API Endpoints",
        description: "Develop secure and scalable endpoints for the application.",
        status: "in_progress",
        priority: "high",
        deadline: "2024-12-05",
        assignees: [
            { id: "u1", name: "Alice Doe" },
            { id: "u2", name: "John Smith" },
        ],
        checklist: [
            { id: "1", name: "Set up API routes", is_done: true, completed_at: "2024-11-01" },
            { id: "2", name: "Implement authentication", is_done: false },
            { id: "3", name: "Write API documentation", is_done: false },
        ],
        completion: {
            is_done: false,
            completed_at: null,
            is_late: false,
        },
        history: [
            { action: "Assigned", user: "Manager", timestamp: "2024-11-01" },
            { action: "Status Updated", user: "Alice Doe", timestamp: "2024-11-10" },
        ],
        review: {
            status: "pending",
            comments: "Looks good, but needs more testing.",
            reviewed_at: null,
        },
        files: [
            { id: "f1", name: "API_Documentation.pdf", uploaded_by: "Alice Doe", uploaded_at: "2024-11-10" },
        ]
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
    };

    return (
        <div className="container mx-auto p-8 space-y-6">
            {/* Header */}
            <Card
                className="p-6 shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg">
                <h1 className="text-3xl font-semibold">{task.name}</h1>
                <p className="text-lg mt-2">{task.description}</p>
                <div className="flex gap-6 mt-4">
                    <Badge variant="outline" color="blue" className="px-4 py-2 flex items-center gap-2">
                        <Clock size={16}/>
                        {task.status}
                    </Badge>
                    <Badge variant="outline" color="yellow" className="px-4 py-2 flex items-center gap-2">
                        <X size={16}/>
                        Priority: {task.priority}
                    </Badge>
                    <Badge variant="outline" color="green" className="px-4 py-2 flex items-center gap-2">
                        <ArrowRight size={16}/>
                        Deadline: {task.deadline}
                    </Badge>
                </div>
            </Card>

            {/* Assigned Users */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Assignees</h2>
                <div className="flex gap-4">
                    {task.assignees.map((assignee) => (
                        <div key={assignee.id} className="flex items-center gap-3">
                            <Avatar src={assignee.avatar} alt={assignee.name} size="lg"/>
                            <p>{assignee.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Checklist */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Checklist</h2>
                <ul className="space-y-3">
                    {task.checklist.map((item) => (
                        <li key={item.id}
                                  className={`flex items-center gap-3 ${item.is_done ? 'text-gray-500 line-through' : ''}`}>
                            <CheckCircle size={20} className={item.is_done ? "text-green-500" : "text-gray-400"}/>
                            <span>{item.name}</span>
                            {item.is_done &&
                                <Text className="text-sm text-green-500">Completed on {item.completed_at}</Text>}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Completion Status */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Completion</h2>
                <p>Status: {task.completion.is_done ? "Completed" : "In Progress"}</p>
                {task.completion.is_done && <p>Completed on: {task.completion.completed_at}</p>}
                <p>{task.completion.is_late ? "This task is late." : "This task is on time."}</p>
            </div>

            {/* Activity Log */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Activity Log</h2>
                <ul className="space-y-3">
                    {task.history.map((log, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <User size={16}/>
                            <Text>{log.action} by {log.user} on {log.timestamp}</Text>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Task Review */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Review</h2>
                <p>Status: {task.review.status}</p>
                <p>Comments: {task.review.comments}</p>
            </div>

            {/* File Attachments */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">File Attachments</h2>
                <input type="file" onChange={handleFileUpload} className="border p-2 rounded-md"/>
                <ul className="space-y-3 mt-3">
                    {task.files.map((file) => (
                        <li key={file.id} className="flex items-center gap-3">
                            <FileText size={20} className="text-gray-600"/>
                            <Text>{file.name}</Text>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Actions */}
            <div className="mt-6 space-x-4">
                <Button variant="outline" color="green" className="px-6 py-3 flex items-center gap-2">
                    <Check size={16}/>
                    Mark as Completed
                </Button>
                <Button variant="secondary" color="blue" className="px-6 py-3 flex items-center gap-2">
                    <ArrowRight size={16}/>
                    Submit for Review
                </Button>
            </div>
        </div>
    );
};
