import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableHeader,
} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ProjectMember} from "@/lib/interfaces.ts";
import EachElement from "@/components/EachElement.tsx";
import FormDialog from "@/components/FormDialog.tsx";
import ProjectMemberForm from "@/pages/project/member/form/ProjectMemberForm.tsx";
import {useProjectMember} from "@/hooks/useProjectMember.ts";
import {PlusCircle} from "lucide-react";

export default function MembersTableItems({project, id}: {
    project: { id: string, name: string };
    id: string | undefined
}) {
    const {members} = useProjectMember(id)

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Members</h2>
                <FormDialog
                    title={`Add new member to " ${project?.name} "`}
                    description="This form is used to add a new project member."
                    form={
                        <ProjectMemberForm project={project}/>
                    }
                    button={
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            Add Member
                        </Button>
                    }
                />
            </div>
            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <EachElement of={members || []} render={(member: ProjectMember) => (
                            <TableRow key={member.email}>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`italic
                                            ${member.role === "MANAGER" ? "bg-blue-200 dark:bg-blue-950" : ""}
                                            ${member.role === "DEVELOPER" ? "bg-green-200 dark:bg-green-950" : ""}
                                            ${member.role === "TESTER" ? "bg-yellow-200 dark:bg-yellow-950" : ""}
                                            ${member.role === "VIEWER" ? "bg-purple-200 dark:bg-purple-950" : ""}
                                        `}>
                                        {member.role}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(member.joined_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </TableCell>
                                <TableCell className="flex gap-2 items-center">
                                    <Badge variant="outline" className="cursor-pointer">
                                        view
                                    </Badge>
                                    <Badge className="cursor-pointer">delete</Badge>
                                </TableCell>
                            </TableRow>
                        )}/>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
