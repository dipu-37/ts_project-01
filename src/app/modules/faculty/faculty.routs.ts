import { Router } from 'express';
import  express  from 'express';
import { FacultyControllers } from './faculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';


 const router = express.Router();

 router.get(
    '/:id',
    FacultyControllers.getSingleFaculty,
  );


  router.get('/',auth(USER_ROLE.admin),FacultyControllers.getAllFaculties)

export const FacultyRoutes = router;