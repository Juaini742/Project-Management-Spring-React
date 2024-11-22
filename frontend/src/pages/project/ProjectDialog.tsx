import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Pencil, PlusCircle} from "lucide-react";
import ProjectForm from "./ProjectForm.tsx";
import {ProjectInterface} from "@/lib/interfaces.ts";

interface Props {
  project?: ProjectInterface;
  type: "create" | "update";
}

export default function ProjectDialog({ project, type }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        {type === "create" ? (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <Pencil />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h2>Create Project</h2>
          <DialogDescription>
            Here is the form to update your profile data
          </DialogDescription>
          <ProjectForm type={type} project={project} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
