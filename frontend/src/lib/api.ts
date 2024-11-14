import axios from "axios"
import {authValues} from "@/lib/interfaces.ts";


const PUBLIC_URL = "http://localhost:8080/api/public";
const SECURED_URL = "http://localhost:8080/api/secured";

const POST = async (url: string, body: any) => {
    try {
        const response = axios.post(url, body, {
            withCredentials: true
        });

        return response;
    } catch (error) {
        console.log(error)
    }
}


const GET = async (url: string) => {
    try {
        const response = axios.get(url, {
            withCredentials: true
        });

        return response;
    } catch (error) {
        console.log(error)
    }
}

export const registerEndpoint = (formData: authValues) => {
    return POST(`${PUBLIC_URL}/auth/register`, formData);
}

export const loginEndpoint = (formData: authValues) => {
    return POST(`${PUBLIC_URL}/auth/login`, formData);
}

export const getMeEndpoint = () => {
    return GET(`${SECURED_URL}/user/me`);
}

export const logoutEndpoint = () => {
    return POST(`${SECURED_URL}/user/logout`, null);
}