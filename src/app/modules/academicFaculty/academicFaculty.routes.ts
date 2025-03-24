import { AcademicFaculty } from './academicFaculty.model';

import express from 'express';

import { AcademicSemesterValidation } from '../academicSemester/academicSemester.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';



const router = express.Router()

router.post('/create-academic-faculty',validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty
)

router.get('/:id',AcademicFacultyControllers.getSingleAcademicFaculty)


router.patch('/:id',validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),AcademicFacultyControllers.updateAcademicFaculty)


router.get('/',AcademicFacultyControllers.getAllAcademicFaculties)



export const AcademicFacultyRoutes = router;