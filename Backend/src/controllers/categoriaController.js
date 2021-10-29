import { categoriaRepository } from "../repositories/categoriaRepository";

const CategoriaController = {
  createCategoria: async (req, res, next) => {
    try {
      
      console.log("!!!!!!!!!!!!!!!!!!!");
      
      console.log(req.body.categoriaPadre=='');
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
        Error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
  delete: async (req, res) => {
    try {
      console.log("CATEGORIASHIJAS");;
      let categoriaHijas = await categoriaRepository.findByCategoriaPadre(
        req.params.id
      );
      categoriaHijas.forEach((categoria) =>
        categoriaRepository.delete(categoria._id)
      );
      const result = await categoriaRepository.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).json({
        Error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
  edit: async (req, res) => {
    try {
      
      let categoria = await categoriaRepository.updateById(req.params.id, req.body);
      if(categoria==undefined){
        res.status(404).json({ mensaje: `404: El inventariable con ID: ${req.params.id} no está registrado en la base de datos`});
      }else{
        categoria != undefined ? res.status(200).json(categoria) : res.status(404).json({mensaje: `El inventariable con ID: ${req.params.id} no está registrado en la base de datos`});
      }
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
        Error: `Ha ocurrido un error en la petición: ${error.message}`,
      });
    }
  },
};
export { CategoriaController };