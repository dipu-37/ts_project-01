"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    //id: z.string(),
    password: zod_1.z
        .string({
        invalid_type_error: "Password must be string",
    })
        .max(20, {
        message: "password can not be more than 20 character",
    }).optional(),
    // needsPasswordChange: z.boolean().optional().default(true),
    // role: z.enum(["student", "faculty", "admin"]),
    //status: z.enum(["in-progress", "blocks"]).default("in-progress"),
    //isDeleted: z.boolean().optional().default(false),
});
exports.userValidation = {
    userValidationSchema,
};
