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

export default function LoginForm() {
  const {isLoadingLogin, onLogin} = useUser()
  const form = useForm<authValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: authValues) => {
    await onLogin(data);
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
            Dont have an account?
            <Link to="/register" className="text-indigo-800">
              {" "}
              click here to register
            </Link>
          </span>
          <Button disabled={isLoadingLogin} className="w-full">
            {isLoadingLogin ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
