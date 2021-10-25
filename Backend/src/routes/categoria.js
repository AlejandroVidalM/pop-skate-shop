import { Router } from "express";
import { validar} from "../services/validation";
import { check } from "express-validator";
import { CategoriaController } from "../controllers/categoriaController";
import { token } from "../services/passport";

const { checkSchema } = require("express-validator");

const router = Router();
router.post('/new', token('admin'), CategoriaController.createCategoria);
router.delete('/:id', token('admin'), CategoriaController.delete);
export default router;