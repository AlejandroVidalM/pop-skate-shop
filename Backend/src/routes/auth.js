import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { password } from "../services/passport";
import { validar} from "../services/validation";
import { param, body, check } from "express-validator";

const { checkSchema } = require("express-validator");

const router = Router();

router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("El campo debe de ser un email valido"),
    check('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
              throw new Error('Las contraseñas no coinciden');
         }
         return true;
    }),
    check("codigoPostal").isPostalCode('ES').withMessage("Código postal inválido")

  ],
  validar,
  AuthController.register
);
router.post(
  "/login",
  [
    check("username")
      .isEmail()
      .withMessage("El campo debe de ser un email valido"),
  ],
  validar,
  password(),
  AuthController.login
);

export default router;
