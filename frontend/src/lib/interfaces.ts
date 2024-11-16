import zod from 'zod';

const requiredString = zod.string().min(1, {message: "This field is required"});

export const authSchema = zod.object({
    email: requiredString.email({message: "Email is invalid"}),
    password: zod.string().min(8, {message: "Password must be at least 8 characters"}),
});

export type authValues = zod.infer<typeof authSchema>;

export const profileSchema = zod.object({
    full_name: requiredString,
    address: requiredString,
    job: requiredString,
});

export type profileValues = zod.infer<typeof profileSchema>;


export interface User {
    id: number;
    email: string;
    role: string;
    "profile": Profile
}

export interface Profile {
    "id": string;
    "full_name": string;
    "address": string;
    "job": string;
    "profile_image": string;
    "created_at": string;
    "updated_at": string;
}