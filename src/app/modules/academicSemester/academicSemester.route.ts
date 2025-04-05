

import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create-academic-semester',
    auth('admin','superAdmin'),
    validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester);



export const AcademicSemesterRouters = router;