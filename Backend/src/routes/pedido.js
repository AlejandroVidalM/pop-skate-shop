import { Router } from "express";
import { validar, mensajeExist} from "../services/validation";
import { check } from "express-validator";
import { token } from "../services/passport";
import { PedidoController } from "../controllers/pedidoController";
const { checkSchema } = require("express-validator");

const router = Router();

router.get('/me', token(), PedidoController.findPedido);
router.get('', token('admin'), PedidoController.findAllPedidos);
router.post('/enviar/:id', token('admin'), PedidoController.confirmarEnvio);
router.post('/entregar/:id', token('admin'), PedidoController.confirmarEntrega);
export default router;