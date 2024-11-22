import MainTemplate from "@/components/template/MainTemplate.tsx";
import ProjectDialog from "@/pages/project/ProjectDialog.tsx";
import EachElement from "@/components/EachElement.tsx";
import {ProjectInterface} from "@/lib/interfaces.ts";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import DeleteProjectButton from "@/pages/project/DeleteProjectButton.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {Eye} from "lucide-react";
import {useProject} from "@/hooks/useProject.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

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
            <div className="p-3">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Project Overview</h1>
                        <ProjectDialog type="create"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <EachElement
                            of={projects || []}
                            render={(project: ProjectInterface) => (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Card key={project.id} className="shadow-md">
                                                <CardHeader className="flex flex-col items-start">
                                                    <CardTitle>{project.name}</CardTitle>
                                                    <CardDescription>{project.description}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex justify-start gap-2">
                                                    {(project.role === "MANAGER" || project.role === "TESTER") && (
                                                        <>
                                                            <DeleteProjectButton id={project.id}/>
                                                            <ProjectDialog type="update" project={project}/>
                                                        </>
                                                    )}

                                                    <Link
                                                        to={
                                                            project.role === "MANAGER" || project.role === "TESTER"
                                                                ? `/project/${project.id}`
                                                                : `/project/${project.id}/members`
                                                        }
                                                    >
                                                        <Button variant="secondary" size="sm"><Eye/></Button>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>You are {project.role} here</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        />
                    </div>
                </div>
            </div>
        </MainTemplate>
    );
}
