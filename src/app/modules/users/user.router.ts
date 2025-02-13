import express, { NextFunction, Request, Response } from "express";
import { userControllers } from "./user.controller";
import { StudentValidations } from "../students/student.validation";
import { validateRequest } from "../../middlewares/validateRequest";



const router = express.Router();
router.post(
  "/create-user",
  validateRequest(StudentValidations.StudentValidationSchema),
  userControllers.createStudent
);

export const userRoute = router;
