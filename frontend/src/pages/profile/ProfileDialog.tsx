import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileForm from "./ProfileForm";

export default function ProfileDialog({ id }: { id: string | undefined }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button>update</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <h2>Update Profile</h2>
            <DialogDescription>
              Here is the form to update your profile data
            </DialogDescription>
            <ProfileForm id={id} type="update" />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
