import { z } from "zod";

export const signupSchema = z.object({
    name : z.string(),
    email: z.string().email(),
    password: z.string()
})

export type signupSchema = z.infer<typeof signupSchema> 

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type signinSchema = z.infer<typeof signinSchema>

export const updatedUserSchema = z.object({
    name : z.string().optional(),
    email : z.string().email().optional(),
    password : z.string().optional()
})

export type updatedUserSchema = z.infer<typeof updatedUserSchema>

export const postSchema = z.object({
    title : z.string(),
    content : z.string()
})

export type postSchema = z.infer<typeof postSchema>

export const updatedPostSchema = z.object({
    title : z.string().optional(),
    content : z.string().optional()
})

export type UpdatedPostSchema = z.infer<typeof updatedPostSchema>