import bcrypt from "bcryptjs";
import { LineaPedido } from "../models/lineaPedido";
import { Pedido } from "../models/pedido";
import { categoriaRepository } from "./categoriaRepository";
import { lineaPedidoRepository } from "./lineaPedidoRepository";
import { productoRepository } from "./productoRepository";

const pedidoRepository = {
  async findCart(user) {
    const result = await Pedido.findOne({estaPedido:false, usuario:user._id}).populate("lineasPedido");
    console.log("RESULT");
    console.log(result);
    if( result != undefined){
    return result;
    }else{
      return this.createCart(user);
    }
  },
  async createCart(user) {
      const carrito = new Pedido({
        usuario: user._id,
        provincia: user.provincia,
        ciudad: user.ciudad,
        direccion: user.direccion,
        codigoPostal: user.codigoPostal,
        estaPedido: false,
        estaEntregado:false,
        esPersonalizado:false,
      });
      const result = await carrito.save();
      console.log(result);
      return result;
  },
  async buyCart(user) {
    let carrito = await pedidoRepository.findCart(user);
    carrito.estaPedido=true;
    
    const pedido = await carrito.save();
    // carrito.estaPedido=false;
    // carrito.lineasPedido.forEach(function(linea){
    //   lineaPedidoRepository.delete(linea._id)
    // })
    // carrito.save();
    return pedido;


  },
  
  async addToCart(productoId, cantidad, user) {
    const producto = await productoRepository.findById(productoId);
    const carrito = await pedidoRepository.findCart(user);
    let productoEnCarro = carrito.lineasPedido.filter((linea) => linea.producto.equals(productoId));
    if(productoEnCarro == 0){
      const precioLinea = producto.precioRebajado * cantidad;
    const lineaPedido = new LineaPedido({
      producto: producto._id,
      cantidad: cantidad,
      subtotal:precioLinea
    });
    await lineaPedido.save();
    console.log(lineaPedido);
    carrito.lineasPedido.push(lineaPedido);
    }else{
      carrito.lineasPedido.filter((linea) => linea.producto.equals(productoId)).forEach(function(linea){
        
        const cantidad = linea.cantidad+=1;
        const subtotal = linea.subtotal+=producto.precioRebajado
        const lineaMod = lineaPedidoRepository.updateById(linea._id, { cantidad: cantidad, subtotal: subtotal });
        console.log("lineaMod");
        console.log(lineaMod);
        console.log("lineaMod");
      });

    }
    
    const result = await carrito.save();
    console.log(result);
    return result;
  },
};


export { pedidoRepository };
