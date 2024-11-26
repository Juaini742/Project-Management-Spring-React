export interface deleteMemberValues {
    id: string;
    projectId: string;
}

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
    is_group_chat_enabled: boolean;
    startDate: string;
    endDate: string;
    category: string;
    budget: string;
    progress: number;
    estimated_hours: number;
    actual_hours: number;
    color: string;
    tag: string;
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
    name: string;
    email: string;
    joinedAt: string;
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
    startDate: string;
    endDate: string;
    deadline: string;
    assignedTo: AssignedToTask[];
}

export interface AssignedToTask {
    email: string;
    isDone: boolean;
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

export interface SearchInterface {
    name: string;
    email: string;
    role: string;
}

export interface PaginationInterface {
    page: number;
    totalPages: number;
    totalElements: number;
}

export interface PaginationStoreInterface {
    page: number;
    totalPages: number;
    size: number;
}