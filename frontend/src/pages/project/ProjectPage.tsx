import MainTemplate from "@/components/template/MainTemplate.tsx";
import ProjectDialog from "@/pages/project/ProjectDialog.tsx";
import EachElement from "@/components/EachElement.tsx";
import {ProjectInterface} from "@/lib/interfaces.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader} from "@/components/ui/card.tsx";
import DeleteProjectButton from "@/pages/project/DeleteProjectButton.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon, Eye, Tag} from "lucide-react";
import {useProject} from "@/hooks/useProject.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {format} from "date-fns";
import {Progress} from "@/components/ui/progress.tsx";
import {calculateRemainingDeadline} from "@/lib/calculateRemainingDeadline.ts";
import {ProgressIndicator} from "@radix-ui/react-progress";

export default function ProjectPage() {
    const {projects, isLoading} = useProject();
    if (isLoading) {
        return (
            Array.from({length: 6}).map((_, index) => (
                <Card key={index} className="shadow-md">
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4"/>
                        <Skeleton className="h-4 w-1/2 mt-2"/>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <Skeleton className="h-5 w-1/4"/>
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-16"/>
                            <Skeleton className="h-8 w-16"/>
                        </div>
                    </CardContent>
                </Card>
            ))
        )
    }

    return (
        <MainTemplate>
            <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">Project Overview</h1>
                    <ProjectDialog type="create"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <EachElement
                        of={projects || []}
                        render={(project: ProjectInterface) => (
                            <TooltipProvider key={project.id}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Card>
                                            <CardHeader>
                                                <div className="flex justify-between items-center">
                                                    <div
                                                        className="text-lg font-semibold text-gray-800 dark:text-white">
                                                        {project.name}
                                                    </div>
                                                    <Tag
                                                        className="text-xs text-white py-1 px-2 rounded-full"
                                                        style={{backgroundColor: project.color ?? "fff"}}
                                                    >
                                                        {project?.tag}
                                                    </Tag>
                                                </div>
                                                <div
                                                    className="flex justify-between items-center text-sm text-gray-500 mt-1">
                                                    <div className="flex-1 flex items-center gap-2">
                                                        <CalendarIcon className="w-5 h-5"/>
                                                        <span>{format(new Date(project.startDate), 'PPP')}</span>
                                                    </div>
                                                    <CardDescription className="text-sm font-semibold">
                                                        {project.category}
                                                    </CardDescription>
                                                </div>
                                            </CardHeader>

                                            <CardContent>
                                                <div>
                                                    <p className="text-left text-sm font-semibold text-gray-700 dark:text-white mb-2">
                                                        Progress
                                                    </p>
                                                    <Progress
                                                        value={project.progress}
                                                        className="h-2 w-full bg-gray-100 rounded-full"
                                                    >
                                                        <ProgressIndicator className="bg-blue-600"/>
                                                    </Progress>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <span
                                                            className="text-xs text-gray-500">{project.progress}%</span>
                                                        <span className="text-xs text-gray-500">
                                                    {project.endDate ? calculateRemainingDeadline(project.endDate) : "Ongoing"}
                                                </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                            <CardFooter>
                                                <div className="flex justify-between items-center space-x-4">
                                                    {project.role === 'MANAGER' || project.role === 'TESTER' ? (
                                                        <>
                                                            <DeleteProjectButton id={project.id}/>
                                                            <ProjectDialog type="update" project={project}/>
                                                        </>
                                                    ) : null}
                                                    <Link to={`/project/${project.id}`}>
                                                        <Button variant="secondary" size="sm"
                                                                className="text-gray-600 dark:text-white">
                                                            <Eye className="w-4 h-4 mr-2"/>
                                                            View
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </CardFooter>
                                        </Card>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>You are a {project.role} in this project</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    />
                </div>
            </div>
        </MainTemplate>

    );
}
