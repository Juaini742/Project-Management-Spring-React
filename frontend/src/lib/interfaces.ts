import zod from "zod";

const requiredString = zod
    .string()
    .min(1, {message: "This field is required"});

export const authSchema = zod.object({
    email: requiredString.email({message: "Email is invalid"}),
    password: zod
        .string()
        .min(8, {message: "Password must be at least 8 characters"}),
});

export type authValues = zod.infer<typeof authSchema>;

export const profileSchema = zod.object({
    full_name: requiredString,
    address: requiredString,
    job: requiredString,
});

export type profileValues = zod.infer<typeof profileSchema>;

export const projectSchema = zod.object({
    name: requiredString,
    description: requiredString,
});

export type projectValues = zod.infer<typeof projectSchema>;

export const friendSchema = zod.object({
    email: requiredString,
});

export type friendValues = zod.infer<typeof friendSchema>;

export const projectMemberSchema = zod.object({
    memberId: requiredString,
    projectId: requiredString,
    role: requiredString
})

export type projectMemberValues = zod.infer<typeof projectMemberSchema>;

export interface FriendUpdate {
    email: string;
    status: string;
}

export interface User {
    id: number;
    email: string;
    role: string;
    profile: Profile;
}

export interface Profile {
    id: string;
    full_name: string;
    address: string;
    job: string;
    profile_image: string;
    created_at: string;
    updated_at: string;
}

export interface ProjectInterface {
    id: string;
    name: string;
    description: string;
    role: string;
}

export interface ProjectDetail {
    projectId: string;
    name: string;
    description: string;
    is_group_chat_enabled: boolean;
}

export interface ProjectMember {
    id: string;
    userId: string;
    projectName: string;
    role: string;
    email: string;
    joined_at: string;
}

export interface TaskByProject {
    id: string;
    own: string;
    tasks: TaskInterface[];
}

export interface TaskInterface {
    id: string;
    name: string;
    description: string;
    status: string;
    priority: string;
    assignedTo: string;
    deadline: string;
}

export interface UserNotFriend {
    id: string;
    email: string;
    role: string
}

export interface UserFriend {
    userId: string;
    email: string;
    friends: FriendDetail[];
}

export interface FriendDetail {
    id: string;
    userId: string;
    email: string;
    status: string;
}
