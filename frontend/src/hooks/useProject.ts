import {getProjectByMemberId} from "@/lib/api";
import { ProjectInterface } from "@/lib/interfaces";
import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";

interface CreateProjectInterface {
  projects: ProjectInterface[] | null;
  setProject: (project: ProjectInterface[] | null) => void;
}

const useProjectStore = create<CreateProjectInterface>((set) => ({
  projects: null,
  setProject: (projects) => set({ projects }),
}));

export const useProject = () => {
  const { projects, setProject } = useProjectStore();

  const { isLoading } = useQuery({
    queryFn: getProjectByMemberId,
    queryKey: ["projects"],
    onSuccess: (data) => {
      setProject((data) || null);
    },
    onError: (error: unknown) => {
      console.log(error);
    },
  });

  return {
    projects,
    isLoading,
  };
};
