import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProjectInterface, projectValues} from "@/lib/interfaces.ts";
import {projectPostEndpoint, updateProjectEndpoint} from "@/lib/api.ts";
import {useToast} from "@/hooks/use-toast.ts";

interface Props {
    type: "create" | "update";
    project: ProjectInterface | undefined;
    form: any;
}

export default function useProjectMutation({type, project, form}: Props) {
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const {isLoading, mutateAsync} = useMutation({
        mutationKey: ["projects"],
        mutationFn: async (data: projectValues) => {
            if (type === "create") {
                projectPostEndpoint(data).then(() =>
                    queryClient.invalidateQueries(["projects"])
                );
            } else {
                if (project) {
                    updateProjectEndpoint(data, project.id).then(() =>
                        queryClient.invalidateQueries(["projects"])
                    );
                }
            }
        },
        onSuccess: async () => {
            form.reset();
            await queryClient.invalidateQueries(["projects"]);
            if (type === "create") {
                return toast({
                    title: "Success",
                    description: "Project created successfully",
                });
            }

            toast({
                title: "Success",
                description: "Project updated successfully",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to create project, please try again",
            });
            console.error(error);
        },
    });

    return {isLoading, mutateAsync};
}