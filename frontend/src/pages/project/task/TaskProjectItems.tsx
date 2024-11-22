import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import EachElement from "@/components/EachElement.tsx";
import {useQuery} from "@tanstack/react-query";
import {getTaskProjectEndpoint} from "@/lib/api.ts";
import {TaskInterface} from "@/lib/interfaces.ts";
import EmptyCard from "@/components/EmptyCard.tsx";

export default function TaskProjectItems({id}: { id: string | undefined }) {
    const {data, isLoading} = useQuery({
        queryKey: ["tasks"],
        queryFn: () => getTaskProjectEndpoint(id),
    });

    if (isLoading) {
        return (
            <EachElement
                of={Array.from({length: 6})}
                render={(_, index) => (
                    <Card key={index} className="shadow-sm">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4"/>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-4 w-full mb-2"/>
                            <Skeleton className="h-4 w-2/3"/>
                            <div className="flex flex-wrap gap-2 items-center mt-2">
                                <Skeleton className="h-6 w-16"/>
                                <Skeleton className="h-6 w-20"/>
                                <Skeleton className="h-4 w-32"/>
                                <Skeleton className="h-4 w-32"/>
                            </div>
                        </CardContent>
                    </Card>
                )}
            />
        )
    }

    return (
        <div className="space-y-4 mt-5">
            {data?.tasks.length === 0 ? (
                <EmptyCard text="Task is empty" />
            ) : (
                <EachElement
                    of={data?.tasks || []}
                    render={(task: TaskInterface) => (
                        <Card key={task.id} className="shadow-sm">
                            <CardHeader>
                                <CardTitle>{task.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                    <Badge variant="secondary">{task.status}</Badge>
                                    <Badge variant="outline">{task.priority}</Badge>
                                    <span className="text-xs text-gray-600">
                    Assigned to: {task.assignedTo || "Unassigned"}
                  </span>
                                    <span className="text-xs text-gray-600">
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </span>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                />
            )}
        </div>
    );
}

