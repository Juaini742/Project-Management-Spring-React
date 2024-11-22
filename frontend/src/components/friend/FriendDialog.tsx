import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader, DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { PlusCircle } from "lucide-react";
import ProjectForm from "./FriendForm.tsx";

export default function FriendDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            Please search user by email with input bellow
          </DialogDescription>
          <ProjectForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
