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
  async findByCategoriaPadre(id) {
    
    const result = await Categoria.find({categoriaPadre: id});
    return result != null ? result : undefined;
  },

  async delete(id) {
    return await Categoria.deleteOne({
      _id: id,
    });
  },
};
export { categoriaRepository };
