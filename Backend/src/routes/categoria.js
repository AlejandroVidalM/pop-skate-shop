import { Router } from "express";
import { validar, mensajeExist} from "../services/validation";
import { check } from "express-validator";
import { CategoriaController } from "../controllers/categoriaController";
import { token } from "../services/passport";
const { checkSchema } = require("express-validator");

const router = Router();
router.post('/new',
[
  check("nombre").exists().withMessage(mensajeExist("nombre"))
],
validar,
token('admin'), CategoriaController.createCategoria);
router.delete('/:id', token('admin'), CategoriaController.delete);
router.put('/:id', token('admin'), CategoriaController.edit);
router.get('', token('admin'), CategoriaController.findAll);

export default router;