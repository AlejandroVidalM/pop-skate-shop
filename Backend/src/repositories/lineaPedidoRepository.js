import bcrypt from "bcryptjs";
import { LineaPedido } from "../models/lineaPedido";
import { Producto } from "../models/producto";
import { pedidoRepository } from "./pedidoRepository";
import { productoRepository } from "./productoRepository";

const lineaPedidoRepository = {
  async updateById(lineaId, modLinea) {
    const result = LineaPedido.findByIdAndUpdate(lineaId, modLinea)
    console.log(result);
    return result;
  },
  async delete(id) {
    return await LineaPedido.deleteOne({
      _id: id,
    });
  },
};
export { lineaPedidoRepository };
