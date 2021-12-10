import { categoriaRepository } from "../repositories/categoriaRepository";
import { productoRepository } from "../repositories/productoRepository";

const CategoriaController = {
  createCategoria: async (req, res, next) => {
    try {
      

      if (
        (await categoriaRepository.findById(req.body.categoriaPadre)) ==
        undefined && req.body.categoriaPadre != undefined
      ) {
        
        res
          .status(400)
          .json({
            mensaje: `400: La catgoria con ID: ${req.body.categoriaPadre} no está registrado en la base de datos`,
          });
      } else {
        
        let nuevaCategoria = await categoriaRepository.create({
          nombre: req.body.nombre,
          categoriaPadre: req.body.categoriaPadre,
          esParteObligatoria: req.body.esParteObligatoria,
        });
        res.status(201).json(nuevaCategoria);
      }
    } catch (error) {
      
      res.status(404).json({
        error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
  delete: async (req, res) => {
    try {
      let categoriaHijas = await categoriaRepository.findByCategoriaPadre(
        req.params.id
      );
      categoriaHijas.forEach((categoria) =>
        categoriaRepository.delete(categoria._id)
      );
      let categoriaOtros = await categoriaRepository.findBynombre("Otros");
      let listaProducto = await productoRepository.findByCategoria(req.params.id);
      listaProducto.forEach(function(producto){
        producto.categoria= categoriaOtros._id;
        producto.save();
      }
      )
      const result = await categoriaRepository.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({
        error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
  edit: async (req, res) => {
    try {
      
      let categoria = await categoriaRepository.updateById(req.params.id, req.body);
      if(categoria==undefined){
        res.status(404).json({ mensaje: `404: La categoría con ID: ${req.params.id} no está registrado en la base de datos`});
      }else{
        categoria != undefined ? res.status(200).json(categoria) : res.status(404).json({mensaje: `La categoría con ID: ${req.params.id} no está registrado en la base de datos`});
      }
    } catch (error) {
      
      res
        .status(404)
        .json({
          error: `Ha ocurrido un error en la petición: ${error.message}`,
        });
    }
  },
  findAll: async(req, res) => {
    try{
      let listaCategorias= await categoriaRepository.findAll();
      if(listaCategorias.length==0){
        res.status(404).json({ mensaje: `404: no se ha encontrado ningun elemento en la base de datos`});
      }else{
        res.status(200).json(listaCategorias);
      }
    } catch (error) {
      
    res
      .status(404)
      .json({
        error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
};
export { CategoriaController };
