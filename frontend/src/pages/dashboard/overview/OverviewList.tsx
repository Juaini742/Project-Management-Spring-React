import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";


export default function OverviewList() {
    return (
        <Card className="p-5 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Tasks Overview</h2>
            <div className="space-y-3">
                <Card className="p-4 shadow-sm bg-red-100 dark:bg-red-950/15">
                    <CardHeader>
                        <CardTitle>Complete Dashboard UI</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Status: <Badge variant="secondary">In Progress</Badge>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Deadline: {new Date().toLocaleDateString()}
                        </p>
                    </CardContent>
                </Card>
                <Card className="p-4 shadow-sm bg-red-100 dark:bg-red-950/15">
                    <CardHeader>
                        <CardTitle>Fix Authentication Bug</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Status: <Badge variant="secondary">Completed</Badge>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Deadline: {new Date().toLocaleDateString()}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </Card>
    )
}