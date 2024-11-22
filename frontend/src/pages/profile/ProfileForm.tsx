import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileSchema, profileValues } from "@/lib/interfaces.ts";
import { updateProfileEndpoint } from "@/lib/api.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/use-toast";

export default function ProfileForm({
  id,
  type,
}: {
  id: string | undefined;
  type: "create" | "update";
}) {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: profileValues) => updateProfileEndpoint(data, id),
    onSuccess: async () => {
      if (type === "create") {
        window.location.reload();
      } else if (type === "update") {
        await queryClient.invalidateQueries(["user"]);
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update profile",
      });
      console.log(error);
    },
  });
  const form = useForm<profileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: type === "update" ? user?.profile.full_name ?? "" : "",
      address: type === "update" ? user?.profile.address ?? "" : "",
      job: type === "update" ? user?.profile.job ?? "" : "",
    },
  });

  const onSubmit = async (data: profileValues) => {
    await mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          name="full_name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="job"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your job" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Button
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a8 8 0 1 1 0 15.292"
                    />
                  </svg>
                </span>
                Loading...
              </>
            ) : type === "update" ? (
              "Update Profile"
            ) : (
              "Create Profile"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
