import { validationResult, check } from "express-validator";

export const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    res.status(400).json(errores.array());
  } else {
    next();
  }
};

export const mensajeExist = (campo) => {
  return "El campo "+ campo + " no puede estar vacio"
};

