import express from 'express'
import { CourseControllers } from './course.controller'
import { CourseValidations } from './course.validation'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../users/user.constant'

const router = express.Router()


router.post('/create-course',auth(USER_ROLE.admin),validateRequest(CourseValidations.createCourseValidationSchema),CourseControllers.createCourse);

router.get('/',CourseControllers.getAllCourse);

router.get('/:id',CourseControllers.getSingleCourse);


router.delete('/:id',CourseControllers.deleteCourse);

router.patch('/:id',validateRequest(CourseValidations.updateCreateCourseValidationSchema),CourseControllers.updateCourse)

router.put('/:courseId/assign-faculties',validateRequest(CourseValidations.FacultiesWithCourseValidationSchema),CourseControllers.assignFacultiesWithCourse)


router.delete('/:courseId/remove-faculties',validateRequest(CourseValidations.FacultiesWithCourseValidationSchema),CourseControllers.removeFacultiesFromCourses)

export const CourseRoutes = router; 