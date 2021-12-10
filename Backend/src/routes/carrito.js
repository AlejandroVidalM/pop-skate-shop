import { Router } from "express";
import { validar, mensajeExist} from "../services/validation";
import { check } from "express-validator";
import { token } from "../services/passport";
import { PedidoController } from "../controllers/pedidoController";
const { checkSchema } = require("express-validator");

const router = Router();

router.get('', token(), PedidoController.findCart);
router.post('/:id', token(), PedidoController.addToCart);
export default router;