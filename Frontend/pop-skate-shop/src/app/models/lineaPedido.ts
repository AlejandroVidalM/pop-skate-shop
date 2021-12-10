import { Producto } from "./producto";
import { User } from "./user";

export interface LineaPedido {
  _id: string,
  cantidad: Number,
  producto: Producto,
  subtotal:Number,
}

export interface LineaPedidoResponse {
  lineaPedido: LineaPedido;
}
