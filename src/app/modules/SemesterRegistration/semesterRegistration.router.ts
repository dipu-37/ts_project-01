import  express from 'express';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';




const router = express.Router();

router.post('/create-semester-registration',
    auth('superAdmin','admin'),
    validateRequest(SemesterRegistrationValidation.createSemesterRegistrationValidationSchema),semesterRegistrationController.createSemesterRegistration)

router.get('/',auth('admin','superAdmin','faculty','student'),semesterRegistrationController.getAllSemesterRegistrations)

router.get('/:id',auth('admin','superAdmin'),semesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id',auth("admin",'superAdmin'),validateRequest(SemesterRegistrationValidation.updateSemesterRegistrationValidationSchema),semesterRegistrationController.updateSemesterRegistration)
export const semesterRegistrationRouter = router;