import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteProjectEndpoint} from "@/lib/api";
import {useToast} from "@/hooks/use-toast";
import ButtonDeleteWithAlert from "@/components/ButtonDeleteWithAlert.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash2} from "lucide-react";

function DeleteProjectButton({id}: { id: string }) {
    const {toast} = useToast();
    const queryClient = useQueryClient();
    const {mutateAsync} = useMutation({
        mutationFn: (id: string) => deleteProjectEndpoint(id),
        onSuccess: async () => {
            toast({
                title: "Success",
                description: "Project deleted successfully",
            });
            await queryClient.invalidateQueries(["projects"]);
        },
    });

    const onDelete = async () => {
        await mutateAsync(id);
    };

    return (
        <ButtonDeleteWithAlert
            label="Delete"
            title="Are you sure, you want to delete this project?"
            desc="This action cannot be undone. This will permanently delete your project and remove your data from our servers."
            onDelete={onDelete}
            button={<Button variant="outlineRed" className="h-9 w-10"><Trash2/></Button>}
        />
    );
}

export default DeleteProjectButton;
