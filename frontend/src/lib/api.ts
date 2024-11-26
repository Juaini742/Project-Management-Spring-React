/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
    authValues, deleteMemberValues,
    FriendUpdate,
    friendValues, PaginationStoreInterface,
    profileValues, projectMemberUpdateValues,
    projectMemberValues,
    projectValues, SearchInterface, taskValues
} from "@/lib/interfaces.ts";

const PUBLIC_URL = "http://localhost:8080/api/public";
const SECURED_URL = "http://localhost:8080/api/secured";

const POST = async (url: string, body: any) => {
    try {
        return axios.post(url, body, {
            withCredentials: true,
        });
    } catch (error: unknown) {
        console.log(error);
    }
};

const GET = async (url: string) => {
    try {
        const res = await axios.get(url, {
            withCredentials: true,
        });

        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

const UPDATE = async (url: string, body: any) => {
    try {
        return axios.put(url, body, {
            withCredentials: true,
        });
    } catch (error: unknown) {
        console.log(error);
        if (error instanceof Error && 'response' in error && typeof error.response === 'object' && error.response !== null && 'data' in error.response && typeof error.response.data === 'object' && error.response.data !== null && 'error' in error.response.data && typeof error.response.data.error === 'string') {
            throw new Error(error.response.data.error);
        }
        throw error;
    }
};

const DELETE = async (url: string) => {
    try {
        return axios.delete(url, {
            withCredentials: true,
        });
    } catch (error) {
        console.log(error);
    }
};

// PUBLIC
export const registerEndpoint = (formData: authValues) => {
    return POST(`${PUBLIC_URL}/auth/register`, formData);
};

export const loginEndpoint = (formData: authValues) => {
    return POST(`${PUBLIC_URL}/auth/login`, formData);
};

// SECURED
// ==== POST ====


// FRIEND


export const taskPostEndpoint = (formData: taskValues) => {
    return POST(`${SECURED_URL}/task`, formData);
};

// ==== SECURED ====
// == USER ==
export const getMeEndpoint = async () => {
    const user = await GET(`${SECURED_URL}/user/me`);

    if (localStorage.getItem("userId")) {
        return user
    } else {
        if (user && user.id) {
            localStorage.setItem("userId", user?.id)
            return user
        }
    }
};

export const logoutEndpoint = () => {
    localStorage.removeItem("userId")
    return POST(`${SECURED_URL}/user/logout`, null);
};

export const getAllUserNotFriendEndpoint = () => {
    return GET(`${SECURED_URL}/user/friend`);
};

export const getAvailableUserForProjectEndpoint = (projectId: string) => {
    return GET(`${SECURED_URL}/user/available?userId=${localStorage.getItem("userId")}&projectId=${projectId}`);
};

// == PROFILE ==
export const updateProfileEndpoint = (
    formData: profileValues,
    id: string | undefined
) => {
    return UPDATE(`${SECURED_URL}/profile/${id}`, formData);
};

// == FRIEND ==
export const getAllUserFriendAccepted = () => {
    return GET(`${SECURED_URL}/friend/accepted`);
};

export const getAllUserFriendPending = () => {
    return GET(`${SECURED_URL}/friend/pending`);
};


export const friendPostEndpoint = (formData: friendValues) => {
    return POST(`${SECURED_URL}/friend`, formData);
};

export const updateFriendStatusEndpoint = (
    formData: FriendUpdate,
) => {
    return UPDATE(`${SECURED_URL}/friend/status`, formData);
};

export const deleteFriendEndpoint = (id: string) => {
    return DELETE(`${SECURED_URL}/friend/${id}`);
};

// == PROJECT ==
export const getProjectByIdEndpoint = (id: string | undefined) => {
    return GET(`${SECURED_URL}/project/${id}/data`);
};

export const getProjectByMemberId = () => {
    return GET(`${SECURED_URL}/project/member`);
};

export const projectPostEndpoint = (formData: projectValues) => {
    return POST(`${SECURED_URL}/project`, formData);
};

export const updateProjectEndpoint = (
    formData: projectValues,
    id: string | undefined
) => {
    return UPDATE(`${SECURED_URL}/project/${id}`, formData);
};

export const deleteProjectEndpoint = (id: string) => {
    return DELETE(`${SECURED_URL}/project/${id}`);
};

// export const getProjectByUser = () => {
//     return GET(`${SECURED_URL}/project`);
// };

// == PROJECT MEMBER ==
export const getMemberByProjectEndpoint = (id: string | undefined, search: SearchInterface, pagination: PaginationStoreInterface) => {
    const queryParams: string[] = [];
    if (search.name) {
        queryParams.push(`name=${search.name}`);
    }
    if (search.email) {
        queryParams.push(`email=${search.email}`);
    }
    if (search.role) {
        queryParams.push(`role=${search.role}`);
    }

    if (pagination.page >= 0) {
        queryParams.push(`page=${pagination.page}`);
    }
    queryParams.push(`size=${pagination.size}`);
    const queryString = queryParams.join("&");
    return GET(`${SECURED_URL}/project-member/${id}?${queryString}`);
};


export const projectMemberPostEndpoint = (formData: projectMemberValues) => {
    return POST(`${SECURED_URL}/project-member`, formData);
};

export const updateMemberRoleEndpoint = (
    formData: projectMemberUpdateValues,
    id: string | undefined
) => {
    return UPDATE(`${SECURED_URL}/project-member/${id}`, formData);
};

export const deleteMemberEndpoint = (formData: deleteMemberValues) => {
    return DELETE(`${SECURED_URL}/project-member?id=${formData.id}&projectId=${formData.projectId}`);
};


// == TASK ==
export const getTaskProjectEndpoint = (id: string | undefined) => {
    return GET(`${SECURED_URL}/task/project/${id}`);
};

export const deleteTaskEndpoint = (id: string | undefined) => {
    return DELETE(`${SECURED_URL}/task/${id}`);
}

