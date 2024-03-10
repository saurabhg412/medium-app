"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedPostSchema = exports.postSchema = exports.updatedUserSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(15),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(10),
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.updatedUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(15).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).max(10).optional()
});
exports.postSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    content: zod_1.z.string().min(1).max(2048)
});
exports.updatedPostSchema = zod_1.z.object({
    title: zod_1.z.string().max(100).optional(),
    content: zod_1.z.string().max(2048).optional()
});
