import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {ProjectMember, SearchInterface} from "@/lib/interfaces.ts";
import EachElement from "@/components/EachElement.tsx";
import ProjectMemberForm from "@/pages/project/member/form/ProjectMemberForm.tsx";
import {useProjectMember} from "@/hooks/useProjectMember.ts";
import { ChevronLeft, ChevronRight,  Plus, XIcon} from "lucide-react";
import UpdateRoleMemberForm from "@/pages/project/member/update-form/UpdateRoleMemberForm.tsx";
import ButtonDeleteWithAlert from "@/components/ButtonDeleteWithAlert.tsx";
import DialogContainer from "@/components/DialogContainer.tsx";
import {Card} from "@/components/ui/card.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink
} from "@/components/ui/pagination.tsx";
import FilterButton from "@/pages/project/member/FilterButton.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import MemberDetail from "@/pages/project/member/MemberDetail.tsx";


export default function MembersTableItems({project, id}: {
    project: { id: string, name: string };
    id: string | undefined
}) {
    const {
        search,
        handleRemoveInputValue,
        members,
        onDelete,
        isGetting,
        isDeleting,
        handleInput,
        selectedType,
        setSelectedType,
        handlePageChange,
        handleNextPage,
        handlePrevPage,
        pagination,
        handleSizeChange
    } = useProjectMember(id);
    const minNext = members?.pagination.page === 0;
    const maxNext = members?.pagination.page === (members?.pagination.totalPages || 1) - 1

    return (
        <div className="mb-6">
            <Card className="flex justify-between items-center mb-3 p-2 rounded border-none shadow-none">
                <div className="flex items-center gap-2">
                    <DialogContainer
                        title={`Add new member to " ${project?.name} "`}
                        description="This form is used to add a new project member."
                        content={<ProjectMemberForm project={project}/>}
                        button={
                            <button className="p-2">
                                <Plus className="size-5"/>
                            </button>
                        }
                    />
                    <FilterButton setSelectedType={setSelectedType}/>

                    <div className="ml-3 flex gap-3">
                        {search.name !== "" && (
                            <button onClick={() => handleRemoveInputValue("name")}
                                    className="bg-gray-200 p-2 text-xs rounded-md flex gap-1 items-center">
                                Name <XIcon className="size-3"/>
                            </button>
                        )}
                        {search.email !== "" && (
                            <button onClick={() => handleRemoveInputValue("email")}
                                    className="bg-gray-200 p-2 text-xs rounded-md flex gap-1 items-center">
                                Email <XIcon className="size-3"/>
                            </button>
                        )}
                        {search.role !== "" && (
                            <button onClick={() => handleRemoveInputValue("role")}
                                    className="bg-gray-200 p-2 text-xs rounded-md flex gap-1 items-center">
                                Role <XIcon className="size-3"/>
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    <input
                        type="text"
                        name={selectedType}
                        value={search[selectedType as keyof SearchInterface]}
                        onChange={handleInput}
                        className="h-full bg-transparent outline-none text-sm p-2 border-b w-full md:w-96"
                        placeholder={`Search by ${selectedType}`}
                    />
                </div>
            </Card>
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {isGetting && <div>Loading...</div>}
                        {!isGetting && members?.data && members?.data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500">
                                    No members found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            <EachElement
                                of={members?.data || []}
                                render={(member: ProjectMember) => {
                                    const userId = localStorage.getItem("userId");
                                    const existingUser = userId !== null && member.userId.toString() == userId;

                                    const getRoleBadgeClass = (role: string) => {
                                        const roleClasses: Record<string, string> = {
                                            MANAGER: "bg-blue-200 dark:bg-blue-950",
                                            DEVELOPER: "bg-green-200 dark:bg-green-950",
                                            TESTER: "bg-yellow-200 dark:bg-yellow-950",
                                            VIEWER: "bg-purple-200 dark:bg-purple-950",
                                        };
                                        return roleClasses[role] || "";
                                    };

                                    const role = getRoleBadgeClass(member.role);

                                    return (
                                        <TableRow key={member.email}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="https://res.cloudinary.com/dixdqxpza/image/upload/v1727789066/qa9tcpiudu2zlkcwuoaa.png"
                                                        alt={member.name}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    {member.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>{member.email}</TableCell>
                                            <TableCell>
                                                {existingUser ? (
                                                    <Badge variant="outline"
                                                           className={`italic ${getRoleBadgeClass(member.role)}`}>
                                                        {member.role}
                                                    </Badge>
                                                ) : (
                                                    <DialogContainer
                                                        title={`Update member role in " ${project?.name} "`}
                                                        description="This form is used to update a member's role."
                                                        content={<UpdateRoleMemberForm member={member}/>}
                                                        button={
                                                            <Badge variant="outline"
                                                                   className={`italic cursor-pointer ${role}`}>
                                                                {member.role}
                                                            </Badge>
                                                        }
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(member.joinedAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </TableCell>
                                            <TableCell className="flex gap-2 items-center">
                                                <DialogContainer
                                                    content={
                                                        <MemberDetail member={member} role={role}  />
                                                    }
                                                    button={
                                                        <Badge variant="outline" className="cursor-pointer">
                                                            view
                                                        </Badge>
                                                    }
                                                />
                                                <ButtonDeleteWithAlert
                                                    isLoading={isDeleting}
                                                    title="Delete Member"
                                                    desc="This action will delete the member from the project and all of their data."
                                                    onDelete={async () => {
                                                        await onDelete({id: member.id, projectId: project.id});
                                                    }}
                                                    button={<Badge className="cursor-pointer">delete</Badge>}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                }}
                            />
                        )}
                    </TableBody>
                </Table>
                <div className="flex gap-4 justify-end py-2">
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <button
                                        onClick={() => handlePrevPage()}
                                        disabled={minNext}
                                        className="mr-2 flex items-center gap-2"
                                    >
                                        <ChevronLeft className="size-4"/>
                                        <span className={`text-sm ${minNext ? "" : "font-semibold"} `}>Previous</span>
                                    </button>
                                </PaginationItem>
                                {Array.from({length: members?.pagination?.totalPages || 1}, (_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            onClick={() => handlePageChange(index + 1)}
                                            isActive={members?.pagination?.page === index}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <button
                                        onClick={() => handleNextPage()}
                                        disabled={maxNext}
                                        className="ml-2 flex items-center gap-2"
                                    >
                                        <span className={`text-sm ${maxNext ? "" : "font-semibold"} `}>Next</span>
                                        <ChevronRight className="size-4"/>
                                    </button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                    <div className="mr-2">
                        <Select
                            defaultValue={`${pagination.size}`}
                            onValueChange={handleSizeChange}
                        >
                            <SelectTrigger className="w-[50px]">
                                <SelectValue placeholder="Select a Size"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Size</SelectLabel>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

            </div>
        </div>
    );
}
