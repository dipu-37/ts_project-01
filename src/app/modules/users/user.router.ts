import { TUserRole } from './user.interface';

import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { StudentValidations } from "../students/student.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validaton";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from './user.constant';



const router = express.Router();
router.post(
  "/create-user",auth(USER_ROLE.admin),
  validateRequest(StudentValidations.StudentValidationSchema),
  userControllers.createStudent
);

router.post('/create-admin',validateRequest(createAdminValidationSchema),userControllers.createAdmin)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty,
);


export const userRoute = router;
