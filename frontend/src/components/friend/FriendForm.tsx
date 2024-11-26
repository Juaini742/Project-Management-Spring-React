import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useToast} from "@/hooks/use-toast.ts";
import EmailInput from "@/components/friend/EmailInput.tsx";
import {Form} from "@/components/ui/form.tsx";
import {friendPostEndpoint} from "@/lib/api.ts";
import ButtonWithLoading from "@/components/ButtonWithLoading.tsx";
import {friendSchema, friendValues} from "@/lib/validation.ts";

export default function FriendForm() {
    const {toast} = useToast();
    const form = useForm<friendValues>({
        resolver: zodResolver(friendSchema),
        defaultValues: {
            email: "",
        },
    });
    const queryClient = useQueryClient();
    const {isLoading, mutateAsync} = useMutation({
        mutationKey: ["friends"],
        mutationFn: async (data: friendValues) => {
            await friendPostEndpoint(data)
        },
        onSuccess: () => {
            form.reset();
            queryClient.invalidateQueries(["friends"]);
            toast({
                title: "Success",
                description: "Friend request has send successfully",
            });
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to send friend request, please try again",
            });
            console.error(error);
        },
    });

    const onSubmit = async (data: friendValues) => {
        await mutateAsync(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <EmailInput name="email" control={form.control}/>

                <div className="flex flex-col gap-2">
                    <ButtonWithLoading label="Add Friend" isLoading={isLoading}/>
                </div>
            </form>
        </Form>
    );
}

