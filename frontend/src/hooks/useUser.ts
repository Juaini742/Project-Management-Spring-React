import { create } from "zustand";
import { getMeEndpoint, logoutEndpoint } from "@/lib/api.ts";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/interfaces.ts";

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

export const useUser = () => {
  const { user, setUser } = useUserStore();
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

  return {
    user: user,
    logout: useUserStore((state) => state.logout),
    isLoading,
  };
};
