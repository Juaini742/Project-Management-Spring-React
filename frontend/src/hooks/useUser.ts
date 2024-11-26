import { create } from "zustand";
import {getMeEndpoint, loginEndpoint, logoutEndpoint, registerEndpoint, updateProfileEndpoint} from "@/lib/api.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { User } from "@/lib/interfaces.ts";
import {authValues, profileValues} from "@/lib/validation.ts";
import {useNavigate} from "react-router-dom";
import {useToast} from "@/hooks/use-toast.ts";

interface CreateUserInterface {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const useUserStore = create<CreateUserInterface>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  logout: async () => {
    await logoutEndpoint();
    set({ user: null });
  },
}));

export const useUser = (id?: string, type?: "create" | "update") => {
  const { toast } = useToast();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading } = useQuery({
    queryFn: getMeEndpoint,
    queryKey: ["user"],
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });

  const { isLoading: isLoadingLogin, mutateAsync: onLogin } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: authValues) => loginEndpoint(data),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isLoadingRegister, mutateAsync: onRegister } = useMutation({
    mutationKey: ["user"],
    mutationFn: (data: authValues) => registerEndpoint(data),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.log(error);
    },
  });


  const { isLoading: isLoadingProfile, mutateAsync: onUpdateProfile } = useMutation({
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
        variant: "default",
        title: "Error",
        description: "Failed to update profile",
      });
      console.log(error);
    },
  });

  return {
    user: user,
    logout: useUserStore((state) => state.logout),
    isLoading,
    isLoadingLogin,
    onLogin,
    isLoadingRegister,
    onRegister,
    isLoadingProfile,
    onUpdateProfile
  };
};
