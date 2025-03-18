import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { StudentValidations } from "../students/student.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { createAdminValidationSchema } from "../Admin/admin.validation";



const router = express.Router();
router.post(
  "/create-user",
  validateRequest(StudentValidations.StudentValidationSchema),
  userControllers.createStudent
);

router.post('/create-admin',validateRequest(createAdminValidationSchema),userControllers.createAdmin)

export const userRoute = router;
