import { ZodDefaultDef } from "./../../../../node_modules/zod/lib/types.d";

import { z } from "zod";

const userValidationSchema = z.object({
  //id: z.string(),
  password: z
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

export const userValidation = {
  userValidationSchema,
};
