import  express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EnrolledCourseValidations } from './enrolledCoursed.validation';
import { EnrolledCourseControllers } from './enrolledCoursed.controller';
import auth from '../../middlewares/auth';



const router = express.Router();


router.post('/create-enrolled-course',
    auth('student'),
    validateRequest(EnrolledCourseValidations.createEnrolledCourseValidationZodSchema),
    EnrolledCourseControllers.createEnrolledCourse)


router.patch('/update-enrolled-course-marks',
    auth('faculty'),validateRequest(EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema),
    EnrolledCourseControllers.updateEnrolledCourseMark)

export const EnrolledCourseRoutes = router