

import express from 'express';
import { StudentControllers } from './student.controller';
import { StudentValidations } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();


router.get('/',
    auth('admin','superAdmin'),
    StudentControllers.getAllStudents);

router.get('/:studentId',auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),StudentControllers.getSingleStudent);

router.patch('/:studentId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    validateRequest(StudentValidations.updateStudentValidationSchema),StudentControllers.updateStudent)

router.delete('/:studentId',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin),
    StudentControllers.deleteStudent);



export const StudentRoute = router;
