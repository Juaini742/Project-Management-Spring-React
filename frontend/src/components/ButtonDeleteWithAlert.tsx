import {Button} from "@/components/ui/button.tsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";

interface Props {
    label?: string;
    title: string;
    desc: string;
    isLoading?: boolean;
    onDelete: () => void;
    button?: React.ReactElement
}

export default function ButtonDeleteWithAlert({label, title, desc, isLoading, onDelete, button}: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {button ? button : (
                    <Button disabled={isLoading}>{label}</Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {desc}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}