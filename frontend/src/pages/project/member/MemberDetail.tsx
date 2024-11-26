import {CalendarIcon, Mail, User} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {ProjectMember} from "@/lib/interfaces.ts";
import {Card} from "@/components/ui/card.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

const tasks = [
    {name: "Fix bug on login page", deadline: "2024-12-01", status: "completed"},
    {name: "Update user profile API", deadline: "2024-12-05", status: "ongoing"},
    {name: "Prepare quarterly report", deadline: "2024-12-10", status: "ongoing"},
    {name: "Review code for feature X", deadline: "2024-12-12", status: "completed"},
    {name: "Test new authentication flow", deadline: "2024-12-15", status: "ongoing"},
    {name: "Optimize database queries", deadline: "2024-12-20", status: "ongoing"},
];

export default function MemberDetail({member, role}: { member: ProjectMember, role: string }) {

    return (
        <Card className="border-none bg-transparent shadow-none flex flex-col gap-3">
            <div className="flex items-center gap-3 border-b-2 pb-2">
                <img
                    src="https://res.cloudinary.com/dixdqxpza/image/upload/v1727789066/qa9tcpiudu2zlkcwuoaa.png"
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border border-red-800"
                />
                <div className="flex flex-col">
                    <span className="text-lg font-semibold">{member.name}</span>
                    <span
                        className="flex items-center gap-1">
                        <Mail size={16}/> {member.email}
                    </span>
                </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                    <User size={16}/> Role:
                </span>
                <Badge variant="outline"
                       className={`italic ${role}`}>
                    {member.role}
                </Badge>
            </div>

            {/* Joined At */}
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                    <CalendarIcon size={16}/> Joined At:
                </span>
                <span>
                    {new Date(member.joinedAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </span>
            </div>

            {/* Todo List */}
            <div className="space-y-2">
                <h4 className="text-lg font-semibold">Todo List</h4>
                <ScrollArea
                    className="max-h-72 overflow-y-auto rounded-md">
                    <ul className="space-y-3 p-3">
                        {tasks.map((task, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                    Task: {task.name}
                                </span>
                                    <div className="text-xs flex items-center gap-2">
                                        <span className="text-xs">Deadline: {task.deadline}</span>
                                        <div
                                            className={`italic ${
                                                task.status === "completed"
                                                    ? "text-green-700 border-green-400"
                                                    : "text-red-700 border-yellow-400"
                                            }`}
                                        >
                                            {task.status}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Badge
                                        variant={task.status === "completed" ? "destructive" : "success"}
                                        className="cursor-pointer">
                                        {task.status === "completed" ? "undone" : "done"}
                                    </Badge>
                                </div>
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </div>
        </Card>
    )
}