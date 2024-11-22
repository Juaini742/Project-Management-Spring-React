import {Badge} from "@/components/ui/badge.tsx";
import {Card} from "@/components/ui/card.tsx";


export default function ActivityList() {
    return (
        <Card className=" p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent
                Activities</h2>
            <div className="space-y-3">
                <div className="flex items-center gap-4">
                    <Badge variant="secondary">Task</Badge>
                    <span className="text-gray-600 dark:text-gray-300">
                                    Completed "Design UI Dashboard"
                                </span>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant="outline">Friend</Badge>
                    <span className="text-gray-600 dark:text-gray-300">
                                    Added "Jane Smith" as a friend
                                </span>
                </div>
                <div className="flex items-center gap-4">
                    <Badge variant="secondary">Comment</Badge>
                    <span className="text-gray-600 dark:text-gray-300">
                                    Commented on "Project X" task
                                </span>
                </div>
            </div>
        </Card>
    )
}