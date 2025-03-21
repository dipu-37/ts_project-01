import  express  from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controller';


const router = express.Router();

router.post('/create-offered-course',validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),OfferedCourseControllers.createOfferedCourse);

export const offeredCourseRouter = router;