import  express  from 'express';
import { OfferedCourseValidation } from './OfferedCourse.validation';
import { OfferedCourseControllers } from './OfferedCourse.controller';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router();

router.post('/create-offered-course',validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),OfferedCourseControllers.createOfferedCourse);
router.patch('/:id',validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),OfferedCourseControllers.updateOfferedCourse)



export const offeredCourseRouter = router;