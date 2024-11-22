import { useUser } from "@/hooks/useUser.ts";
import { Card } from "@/components/ui/card.tsx";
import ProfileForm from "./ProfileForm";

export default function ProfileFormContainer() {
  const { user } = useUser();
  const id = user?.profile.id;

  return (
    <div className="absolute h-screen z-50 w-full bg-black/10 backdrop-blur top-0 bottom-0 left-0 right-0 flex justify-center items-center flex-col">
      <Card className="p-5 md:w-96">
        <ProfileForm id={id} type="create" />
      </Card>
    </div>
  );
}
