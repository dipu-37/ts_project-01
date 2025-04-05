import { Router } from 'express';
import  express  from 'express';
import { FacultyControllers } from './faculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';


 const router = express.Router();

 router.get(
    '/:id',
    auth('admin','superAdmin','faculty'),
    FacultyControllers.getSingleFaculty,
  );


router.get('/',auth('superAdmin','admin','faculty'),
FacultyControllers.getAllFaculties)

export const FacultyRoutes = router;