import  express  from 'express';
import { Router } from 'express';
import { AdminControllers } from './admin.controller';


const router = express.Router();


router.get('/:id',AdminControllers.getSingleAdmin);


export const AdminRoutes = router;