import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { password } from "../services/passport";
import { validar, mensajeExist} from "../services/validation";
import { param, body, check } from "express-validator";
const { checkSchema } = require("express-validator");



const router = Router();

router.post(
  "/register",
  [
    check("nombre").exists().withMessage(mensajeExist("nombre")),
    check("apellidos").exists().withMessage(mensajeExist("apellidos")),

    check("email")
      .isEmail()
      .withMessage(mensajeExist("email")),
    check('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
              throw new Error('Las contraseñas no coinciden');
         }
         return true;
    }),
    check("provincia").exists().withMessage(mensajeExist("provincia")),
    check("ciudad").exists().withMessage(mensajeExist("ciudad")),
    check("direccion").exists().withMessage(mensajeExist("direccion")),
    check("codigoPostal").isPostalCode('ES').withMessage("Código postal inválido"),
    
  ],
  validar,
  AuthController.register
);
router.post(
  "/login",
  [check("email")
  .isEmail()
  .withMessage("El campo debe de ser un email valido")],
  validar,
  password(),
  AuthController.login
);

export default router;
