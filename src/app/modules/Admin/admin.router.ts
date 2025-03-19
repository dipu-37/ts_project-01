import  express  from 'express';
import { Router } from 'express';
import { AdminControllers } from './admin.controller';


const router = express.Router();


router.get('/:id',AdminControllers.getSingleAdmin);
router.get('/',AdminControllers.getAllAdmin);
router.patch('/:id',AdminControllers.updateAdmin);
router.delete('/:adminId',AdminControllers.deleteAdmin);


export const AdminRoutes = router;