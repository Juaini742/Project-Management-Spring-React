import {getMemberByProjectEndpoint} from "@/lib/api";
import {ProjectMember} from "@/lib/interfaces";
import {create} from "zustand";
import {useQuery} from "@tanstack/react-query";

interface CreateProjectInterface {
    members: ProjectMember[] | null;
    setMembers: (project: ProjectMember[] | null) => void;
}

const useProjectStore = create<CreateProjectInterface>((set) => ({
    members: null,
    setMembers: (members) => set({members}),
}));

export const useProjectMember = (id: string | undefined) => {
    const {members, setMembers} = useProjectStore();

    const {isLoading} = useQuery({
        queryKey: ["members"],
        queryFn: () => getMemberByProjectEndpoint(id),
        onSuccess: (data) => {
            setMembers((data) || null);
        },
        onError: (error: unknown) => {
            console.log(error);
        },
    });

    return {
        members,
        isLoading,
    };
};
