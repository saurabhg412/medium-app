import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export type signupSchema = z.infer<typeof signupSchema>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type signinSchema = z.infer<typeof signinSchema>;
export declare const updatedUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    password?: string | undefined;
}, {
    name?: string | undefined;
    password?: string | undefined;
}>;
export type updatedUserSchema = z.infer<typeof updatedUserSchema>;
export declare const postSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export type postSchema = z.infer<typeof postSchema>;
export declare const updatedPostSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
}>;
export type UpdatedPostSchema = z.infer<typeof updatedPostSchema>;
