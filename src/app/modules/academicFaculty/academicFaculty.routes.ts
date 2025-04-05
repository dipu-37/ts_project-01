import { AcademicFaculty } from './academicFaculty.model';

import express from 'express';

import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';



const router = express.Router()

router.post('/create-academic-faculty',
    auth('superAdmin'),
    validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),AcademicFacultyControllers.createAcademicFaculty
)

router.get('/:id',AcademicFacultyControllers.getSingleAcademicFaculty)


router.patch('/:id',validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),AcademicFacultyControllers.updateAcademicFaculty)


router.get('/',AcademicFacultyControllers.getAllAcademicFaculties)



export const AcademicFacultyRoutes = router;