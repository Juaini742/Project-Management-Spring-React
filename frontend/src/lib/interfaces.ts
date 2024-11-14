import zod from 'zod';

const requiredString = zod.string().min(1, {message: "This field is required"});

export const authSchema = zod.object({
    email: requiredString.email({message: "Email is invalid"}),
    password: zod.string().min(8, {message: "Password must be at least 8 characters"}),
});

export type authValues = zod.infer<typeof authSchema>;
