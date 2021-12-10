import { pedidoRepository } from "../repositories/pedidoRepository";
import { lineaPedidoRepository } from "../repositories/lineaPedidoRepository";


const PedidoController = {
  
  addToCart: async (req, res) => {
    try {
      
      let lineaPedido = await pedidoRepository.addToCart(req.params.id, req.body.cantidad, req.user);
      
      res.status(201).json(lineaPedido);
    } catch (error) {
      
      res
        .status(404)
        .json({
          error: `Ha ocurrido un error en la petición: ${error.message}`,
        });
    }
  },
  findCart: async (req,res) => {
    try {

      let carrito = await pedidoRepository.findCart(req.user);
      
      res.status(200).json(carrito);
    } catch (error) {
      res
        .status(404)
        .json({
          error: `Ha ocurrido un error en la petición: ${error.message}`,
        });
    }
  }
};
export { PedidoController };
