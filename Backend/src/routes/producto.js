import { Router } from "express";
import { validar, mensajeExist } from "../services/validation";
import { check } from "express-validator";
import { ProductoController } from "../controllers/productoController";
import { token } from "../services/passport";

const { checkSchema } = require("express-validator");

const router = Router();
router.post(
  "/new",
  [
    check("nombre").exists().withMessage(mensajeExist("nombre")),
    check("marca").exists().withMessage(mensajeExist("marca")),
    check("precio").isFloat(0.0).withMessage("El precio debe ser positivo"),
    check("stock").isInt([ {lt: 1} ]).withMessage("El stock debe ser positivo"),
    check("descuento")
      .isFloat(0.0)
      .withMessage("El descuento debe ser positivo"),
  ],
  validar,
  token("admin"),
  ProductoController.createProducto
);
router.delete("/:id", token("admin"), ProductoController.delete);
router.put("/:id", token("admin"), ProductoController.edit);
router.get("", token(), ProductoController.findAll);
router.get('/:id', token('admin'), ProductoController.findById);
export default router;
