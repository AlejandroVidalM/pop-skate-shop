import { Router } from "express";
import { validar} from "../services/validation";
import { check } from "express-validator";
import { UserController } from "../controllers/userController";
import { token } from "../services/passport";
const { checkSchema } = require("express-validator");

const router = Router();
router.get('', token(), UserController.myUser);
export default router;