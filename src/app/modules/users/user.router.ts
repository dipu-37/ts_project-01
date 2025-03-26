import { TUserRole } from "./user.interface";

import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { StudentValidations } from "../students/student.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { createFacultyValidationSchema } from "../faculty/faculty.validaton";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { upload } from "../../utils/sendImageToCloudinary";

const router = express.Router();


router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req : Request, res : Response , next : NextFunction)=>{
    req.body = JSON.parse(req.body.data);
    next()
  },
  validateRequest(StudentValidations.StudentValidationSchema),
  userControllers.createStudent
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty
);

router.post(
  "/change-status/:id",
  auth("admin", "superAdmin"),
  userControllers.changeStatus
);

router.get(
  "/me",
  auth("student", "admin", "faculty", "superAdmin"),
  userControllers.getMe
);

export const userRoute = router;
