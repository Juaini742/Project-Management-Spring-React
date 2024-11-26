import {deleteMemberEndpoint, getMemberByProjectEndpoint} from "@/lib/api";
import {
    deleteMemberValues,
    PaginationInterface,
    PaginationStoreInterface,
    ProjectMember,
    SearchInterface
} from "@/lib/interfaces";
import {create} from "zustand";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useRef, useState} from "react";
import {useToast} from "@/hooks/use-toast.ts";


interface MemberDataInterface {
    data:  ProjectMember[] | null ;
    pagination: PaginationInterface
}

interface CreateProjectInterface {
    members: MemberDataInterface | null;
    setMembers: (members: MemberDataInterface | null) => void;
}

const useProjectMemberStore = create<CreateProjectInterface>((set) => ({
    members: null,
    setMembers: (members) => set({members}),
}));

export const useProjectMember = (id: string | undefined) => {
    const {toast} = useToast();
    const {members, setMembers} = useProjectMemberStore();
    const queryClient = useQueryClient();
    const [selectedType, setSelectedType] = useState<string>("name");
    const [search, setSearch] = useState<SearchInterface>({
        name: "",
        email: "",
        role: "",
    });
    const [pagination, setPagination] = useState<PaginationStoreInterface>({
        page: 0,
        size: 5,
        totalPages: 1,
    });
    const inputRef = useRef<NodeJS.Timeout | null>(null);
    const {isLoading: isGetting, refetch} = useQuery({
        queryKey: ["members", pagination.page],
        queryFn: async () => {
            return getMemberByProjectEndpoint(id, search, pagination);
        },
        enabled: !!id,
        keepPreviousData: true,
        onSuccess: (data) => {
            setMembers(data || null);
        },
        onError: (error: unknown) => {
            console.log(error);
        }
    });

    const handlePageChange = (newPage: number) => {
        setPagination((prev) => ({
            ...prev,
            page: newPage
        }));
    };

    const handlePrevPage = () => {
        setPagination((prev) => {
            if (prev.page <= 0) {
                return prev;
            }
            return {...prev, page: prev.page - 1};
        });
    };

    const handleNextPage = () => {
        setPagination((prev) => {
            if (prev.page >= (members?.pagination?.totalPages || 1) - 1) {
                return prev;
            }
            return {...prev, page: prev.page + 1};
        });
    };

    const handleSizeChange = async (size: string) => {
        setPagination((prev) => ({
            ...prev,
            size: parseInt(size),
            page: 0
        }));

        await refetch();
        await refetch();
    };


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setSearch((prevSearch) => ({
            ...prevSearch,
            [name]: value,
        }));

        if (inputRef.current) {
            clearTimeout(inputRef.current);
        }

        inputRef.current = setTimeout(async () => {
            await refetch()
        }, 500)
    };

    const handleRemoveInputValue = async (type: string) => {
        setSearch((prev) => {
            return {...prev, [type]: ""};
        });

        if (inputRef.current) {
            clearTimeout(inputRef.current);
        }

        await refetch();
        await refetch();
    };


    const {isLoading: isDeleting, mutateAsync: onDelete} = useMutation({
        mutationFn: async (data: deleteMemberValues) => {
            await deleteMemberEndpoint(data)
        },
        onSuccess: async () => {
            toast({
                title: "Success",
                description: "Member added successfully",
            })
            await queryClient.invalidateQueries({queryKey: ["members"]})
        },
        onError: (error: any) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: error?.response?.data?.error || "An error occurred"
            })
        }
    })

    return {
        members,
        isGetting,
        isDeleting,
        onDelete,
        handleInput,
        search,
        setSearch,
        setSelectedType,
        selectedType,
        handleRemoveInputValue,
        handlePageChange,
        handleNextPage,
        handlePrevPage,
        pagination,
        handleSizeChange
    };
};
