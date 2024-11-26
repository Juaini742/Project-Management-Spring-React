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
    name: zod.string().min(1, "Project name is required"),
    description: zod.string().min(1, "Description is required"),
    startDate: zod.date().refine((date) => date <= new Date(), {
        message: "Start date must be in the past or today",
    }),
    endDate: zod.date().optional(),
    category: zod.string().min(1, "Project name is required"),
    budget: zod.string().min(0, "Budget must be greater than 0").optional(),
    estimated_hours: zod.string().min(0, "Budget must be greater than 0").optional(),
    actual_hours: zod.string().min(0, "Budget must be greater than 0").optional(),
    color: zod.string().optional(),
    tags: zod.string().optional(),
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

export const projectMemberUpdateSchema = zod.object({
    role: requiredString,
})

export type projectMemberUpdateValues = zod.infer<typeof projectMemberUpdateSchema>;

export const taskSchema = zod.object({
    projectId: requiredString,
    name: requiredString,
    description: requiredString,
    status: requiredString,
    priority: requiredString,
    startDate: zod.date({
        required_error: "A date of birth is required.",
    }),
    endDate: zod.date({
        required_error: "A date of birth is required.",
    }),
    assignedTo: zod.array(zod.string()).min(1, "At least one user must be assigned")
})

export type taskValues = zod.infer<typeof taskSchema>;