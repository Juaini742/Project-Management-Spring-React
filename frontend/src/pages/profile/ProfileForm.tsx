import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUser} from "@/hooks/useUser";
import {profileSchema, profileValues} from "@/lib/validation.ts";
import ButtonWithLoading from "@/components/ButtonWithLoading.tsx";

export default function ProfileForm({id, type}: {
    id: string | undefined;
    type: "create" | "update";
}) {
    const {user, isLoadingProfile, onUpdateProfile} = useUser(id, type);
    const form = useForm<profileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: type === "update" ? user?.profile.full_name ?? "" : "",
            address: type === "update" ? user?.profile.address ?? "" : "",
            job: type === "update" ? user?.profile.job ?? "" : "",
        },
    });

    const onSubmit = async (data: profileValues) => {
        await onUpdateProfile(data);
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
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="job"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Job</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter your job" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name="address"
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>address</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-2">
                    <ButtonWithLoading
                        isLoading={isLoadingProfile}
                        label={type === "update" ? "Update profile" : "Create profile"}
                    />
                </div>
            </form>
        </Form>
    );
}
