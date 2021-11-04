import { categoriaRepository } from "../repositories/categoriaRepository";
import { productoRepository } from "../repositories/productoRepository";

const ProductoController = {
  createProducto: async (req, res, next) => {
    try {
      

      if (
        (await categoriaRepository.findById(req.body.categoria)) ==
        undefined && req.body.categoria != undefined
      ) {
        
        res
          .status(400)
          .json({
            mensaje: `400: La catgoria con ID: ${req.body.categoria} no está registrado en la base de datos`,
          });
      } else {
        
        let nuevoProducto = await productoRepository.create({
          nombre: req.body.nombre,
          marca: req.body.marca,
          precio: req.body.precio,
          categoria: req.body.categoria,
          disponible: req.body.disponible,
          stock: req.body.stock,
          descuento: req.body.descuento,
        });
        res.status(201).json(nuevoProducto);
      }
    } catch (error) {
      
      res.status(404).json({
        Error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
  delete: async (req, res) => {
    try {
      
      const result = await productoRepository.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({
        Error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
  edit: async (req, res) => {
    try {
      
      let producto = await productoRepository.updateById(req.params.id, req.body);
      producto != undefined ? res.status(200).json(producto) : res.status(404).json({mensaje: `El producto con ID: ${req.params.id} no está registrado en la base de datos`});
      
    } catch (error) {
      
      res
        .status(404)
        .json({
          Error: `Ha ocurrido un error en la petición: ${error.message}`,
        });
    }
  },
  findAll: async(req, res) => {
    try{
      let listaProductos= await productoRepository.findAll();
      if(listaProductos.length==0){
        res.status(404).json({ mensaje: `404: no se ha encontrado ningun elemento en la base de datos`});
      }else{
        res.status(200).json(listaProductos);
      }
    } catch (error) {
      
    res
      .status(404)
      .json({
        Error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
  findByCategoria: async(req, res) => {
    try{
      let listaProductos= await productoRepository.findByCategoria(req.body.categoria);
      if(listaProductos.length==0){
        res.status(404).json({ mensaje: `404: no se ha encontrado ningun elemento en la base de datos`});
      }else{
        res.status(200).json(listaProductos);
      }
    } catch (error) {
      
    res
      .status(404)
      .json({
        Error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
};
export { ProductoController };
