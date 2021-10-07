import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import {password} from '../services/passport'

const router = Router();


router.post('/register', AuthController.register);
router.post('/login', password(), AuthController.login);



export default router;