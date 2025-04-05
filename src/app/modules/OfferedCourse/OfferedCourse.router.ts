import  express  from 'express';
import { OfferedCourseValidation } from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';


const router = express.Router();


router.get('/my-offered-courses',auth('student'),OfferedCourseControllers.getMyOfferedCourse)


router.post('/create-offered-course',validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),OfferedCourseControllers.createOfferedCourse);


router.patch('/:id',validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),OfferedCourseControllers.updateOfferedCourse)



export const offeredCourseRouter = router;