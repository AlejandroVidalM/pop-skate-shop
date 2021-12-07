import bcrypt from "bcryptjs";
import { Categoria } from "../models/categoria";
import { Producto } from "../models/producto";

const productoRepository = {
  async create(nuevoProducto) {
    const producto = new Producto({
      nombre: nuevoProducto.nombre,
      marca: nuevoProducto.marca,
      precio: nuevoProducto.precio,
      categoria: nuevoProducto.categoria,
      disponible: nuevoProducto.disponible,
      stock: nuevoProducto.stock,
      descuento: nuevoProducto.descuento,
    });
    const result = await producto.save();
    console.log(result);
    return result;
  },
  async findById(id) {
    const result = await Producto.findById(id).exec();
    return result != null ? result : undefined;
  },
  async findAll() {
    const result =  await Producto.find({}).exec();
    return result;
  },
  async findByCategoria(categoria) {
    
    const result = await Categoria.find({_id: categoria});
    return result != null ? result : undefined;
  },
  
  async updateById(id, productoModificado) {

    const productoGuardado = await Producto.findById(id);
    if (productoGuardado != null) {
        return await Object.assign(productoGuardado, productoModificado).save();
    } else
    return undefined
},

  async delete(id) {
    return await Producto.deleteOne({
      _id: id,
    });
  },
  async inhabilitar(id) {
    
    const productoGuardado = await Producto.findById(id);
    
    if (productoGuardado != null) {
      productoGuardado.disponible = false;
      return await productoGuardado;
    } else
      return undefined
  }
};
export { productoRepository };
