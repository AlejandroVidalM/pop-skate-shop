import { LineaPedido } from "./lineaPedido";
import { User } from "./user";

export interface Pedido {
  _id: string;
  estaEnviado: Boolean;
  estaEntregado: Boolean;
  fechaPedido: Date;
  fechaEntrega: Date;
  total: Number;
  esPersonalizado: Boolean;
  estaPedido: Boolean;
  lineasPedido: Array<LineaPedido>;
  provincia: string;
  ciudad: string;
  direccion: string;
  codigoPostal: string;
  usuario: String;
}

export interface PedidoResponse {
  pedido: Pedido;
}
