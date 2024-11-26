import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Link } from "react-router-dom";
import {authSchema, authValues} from "@/lib/validation.ts";
import {useUser} from "@/hooks/useUser.ts";

export default function RegisterForm() {
  const {isLoadingRegister, onRegister} = useUser()
  const form = useForm<authValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: authValues) => {
    await onRegister(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <span className="text-xs">
            Already have an account?
            <Link to="/login" className="text-indigo-800">
              {" "}
              click here to login
            </Link>
          </span>
          <Button disabled={isLoadingRegister} className="w-full">
            {isLoadingRegister ? "Loading...." : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
