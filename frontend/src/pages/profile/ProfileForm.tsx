import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation} from "@tanstack/react-query";
import {profileSchema, profileValues} from "@/lib/interfaces.ts";
import {updateProfileEndpoint} from "@/lib/api.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUser} from "@/hooks/useUser.tsx";
import {Card} from "@/components/ui/card.tsx";


export default function ProfileForm() {
    const {user} = useUser()
    const id = user?.profile.id
    console.log(id)
    console.log(user)
    const {isLoading, mutateAsync} = useMutation({
        mutationKey: ["user"],
        mutationFn: (data: profileValues) => updateProfileEndpoint(data, id),
        onSuccess: () => {
            window.location.reload();
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const form = useForm<profileValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: "",
            address: "",
            job: "",
        }
    })

    const onSubmit = async (data: profileValues) => {
        await mutateAsync(data)
    }


    return (
        <div
            className="absolute h-screen z-50 w-full bg-black/10 backdrop-blur top-0 bottom-0 left-0 right-0 flex justify-center items-center flex-col">
            <Card className="p-5 md:w-96">
                <Form {...form}>
                    <form onClick={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                        <FormField
                            name="full_name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Full Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your full name" {...field}/>
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
                                    <FormLabel>
                                        Job
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your job" {...field}/>
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
                                    <FormLabel>
                                        address
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your address" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-2">
                            <Button disabled={isLoading}
                                    className="w-full">{isLoading ? "Loading..." : "Create Profile"}</Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}