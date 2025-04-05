import express from 'express'
import { CourseControllers } from './course.controller'
import { CourseValidations } from './course.validation'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'

const router = express.Router()


router.post('/create-course',auth('admin','superAdmin'),validateRequest(CourseValidations.createCourseValidationSchema),CourseControllers.createCourse);

router.get('/',auth('superAdmin','admin','faculty','student'),CourseControllers.getAllCourse);

router.get('/:id',auth('superAdmin','admin','faculty','student'),CourseControllers.getSingleCourse);


router.delete('/:id',auth('superAdmin','admin'),CourseControllers.deleteCourse);

router.patch('/:id',auth('superAdmin','admin'),validateRequest(CourseValidations.updateCreateCourseValidationSchema),CourseControllers.updateCourse)

router.put('/:courseId/assign-faculties',auth('superAdmin','admin'),validateRequest(CourseValidations.FacultiesWithCourseValidationSchema),CourseControllers.assignFacultiesWithCourse)

router.get('/:courseId/get-faculties',
    auth('superAdmin','admin','faculty','student'),CourseControllers.getFacultiesWithCourse
)

router.delete('/:courseId/remove-faculties',auth('superAdmin','admin'),validateRequest(CourseValidations.FacultiesWithCourseValidationSchema),CourseControllers.removeFacultiesFromCourses)

export const CourseRoutes = router; 

