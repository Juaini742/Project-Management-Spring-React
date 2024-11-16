import axios from "axios"
import {authValues, profileValues} from "@/lib/interfaces.ts";


const PUBLIC_URL = "http://localhost:8080/api/public";
const SECURED_URL = "http://localhost:8080/api/secured";

const POST = async (url: string, body: any) => {
    try {
        return axios.post(url, body, {
            withCredentials: true
        });
    } catch (error) {
        console.log(error)
    }
}


const GET = async (url: string) => {
    try {
        return axios.get(url, {
            withCredentials: true
        });
    } catch (error) {
        console.log(error)
    }
}

const UPDATE = async (url: string, body: any) => {
    try {
        return axios.put(url, body, {
            withCredentials: true
        });
    } catch (error) {
        console.log(error)
    }
}

// PUBLIC
export const registerEndpoint = (formData: authValues) => {
    return POST(`${PUBLIC_URL}/auth/register`, formData);
}

export const loginEndpoint = (formData: authValues) => {
    return POST(`${PUBLIC_URL}/auth/login`, formData);
}


// SECURED
// POST
export const logoutEndpoint = () => {
    return POST(`${SECURED_URL}/user/logout`, null);
}


// GET
export const getMeEndpoint = () => {
    return GET(`${SECURED_URL}/user/me`);
}


// UPDATE
export const updateProfileEndpoint = (formData: profileValues, id: string | undefined) => {
    console.log(id)
    return UPDATE(`${SECURED_URL}/profile/${id}`, formData);
}

