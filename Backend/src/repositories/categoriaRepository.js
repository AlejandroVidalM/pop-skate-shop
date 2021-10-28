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
    console.log(result);
    return result;
  },
  async findById(id) {
    const result = await Categoria.findById(id).exec();
    return result != null ? result : undefined;
  },
  async findAll() {
    const result =  await Categoria.find({}).exec();
    return result;
  },
  async findByCategoriaPadre(id) {
    
    const result = await Categoria.find({categoriaPadre: id});
    return result != null ? result : undefined;
  },
  
  async updateById(id, categoriaModificada) {

    const categoriaGuardada = await Categoria.findById(id);
    if (categoriaGuardada != null) {
        if (categoriaModificada.categoriaPadre==undefined){
          categoriaGuardada.categoriaPadre=undefined
        }
        return await Object.assign(categoriaGuardada, categoriaModificada).save();
    } else
    return undefined
},

  async delete(id) {
    return await Categoria.deleteOne({
      _id: id,
    });
  },
};
export { categoriaRepository };
