import bcrypt from "bcryptjs";
import { Categoria } from "../models/categoria";

const categoriaRepository = {
  async create(nuevaCategoria) {
    const categoria = new Categoria({
      nombre: nuevaCategoria.nombre,
      categoriaPadre: nuevaCategoria.categoriaPadre,
      esParteObligatoria: nuevaCategoria.esParteObligatoria,
    });
    const result = await categoria.save();
    return result;
  },
  async findById(id) {
     const result = await Categoria.findById(id).exec();
     return result != null ? result : undefined;
  },
};
export { categoriaRepository };
