import { z } from "zod";

export const signupSchema = z.object({
    name : z.string().min(3).max(15),
    email: z.string().email(),
    password: z.string().min(6).max(10),
})

export type signupSchema = z.infer<typeof signupSchema> 

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type signinSchema = z.infer<typeof signinSchema>

export const updatedUserSchema = z.object({
    name : z.string().min(3).max(15).optional(),
    password : z.string().min(6).max(10).optional()
})

export type updatedUserSchema = z.infer<typeof updatedUserSchema>

export const postSchema = z.object({
    title : z.string().min(3).max(50),
    content : z.string().max(2048)
})

export type postSchema = z.infer<typeof postSchema>

export const updatedPostSchema = z.object({
    title : z.string().min(3).max(50).optional(),
    content : z.string().max(2048).optional()
})

export type UpdatedPostSchema = z.infer<typeof updatedPostSchema>