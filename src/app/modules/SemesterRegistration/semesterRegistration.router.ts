import  express from 'express';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';




const router = express.Router();

router.post('/create-semester-registration',validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema),semesterRegistrationController.createSemesterRegistration)

router.get('/',semesterRegistrationController.getAllSemesterRegistrations)

router.get('/:id',semesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id',validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema),semesterRegistrationController.updateSemesterRegistration)
export const semesterRegistrationRouter = router;