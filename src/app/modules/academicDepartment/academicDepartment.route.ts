import { AcademicDepartment } from './academicDepartment.model';

import express  from 'express';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router();

router.post('/create-academic-department',/*validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), */AcademicDepartmentController.createAcademicDepartment)

router.get('/:departmentId',AcademicDepartmentController.getSingleAcademicDepartment)

router.get('/',AcademicDepartmentController.getAllAcademicDepartments)

router.patch('/:departmentId',validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema),AcademicDepartmentController.updateAcademicDepartment)


export const AcademicDepartmentRoutes = router;