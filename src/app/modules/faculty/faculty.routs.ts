import { Router } from 'express';
import  express  from 'express';
import { FacultyControllers } from './faculty.controller';


 const router = express.Router();

 router.get(
    '/:id',
    FacultyControllers.getSingleFaculty,
  );

export const FacultyRoutes = router;