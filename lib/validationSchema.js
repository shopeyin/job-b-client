import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const RoleEnum = z.enum(["admin", "employer", "job_seeker"]);

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z.string().min(8, "Password do not match"),
    role: RoleEnum, 
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"], 
  });

export const applicationFormSchema = z.object({
  resume: z.string().min(1, "resume is required"),
  cover_letter: z
    .string()
    .min(50, "Cover letter must be at least 8 characters long")
    .max(2000, "Cover letter must be at most 500 characters long"),
});

export const resetFormSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z.string().min(8, "Password do not match"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"], // Target the passwordConfirm field for the error
  });

export const forgetPasswordFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});
