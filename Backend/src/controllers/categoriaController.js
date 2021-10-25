import { categoriaRepository } from "../repositories/categoriaRepository";

const CategoriaController = {

    createCategoria: async (req, res, next) => {
        try{
            
            if (await categoriaRepository.findById(req.body.categoriaPadre) == undefined) {
                res.status(400).json({ mensaje: `400: La catgoria con ID: ${req.body.categoriaPadre} no está registrado en la base de datos` });
            } else {
                let nuevaCategoria = await categoriaRepository.create({
                    nombre: req.body.nombre,
                    categoriaPadre: req.body.categoriaPadre,
                    esParteObligatoria: req.body.esParteObligatoria,
                })
                res.status(201).json(nuevaCategoria);
            }
        }catch (error) {
            res.status(404).json({
                Error: `Ha ocurrido un error en la petición: ${error.message}`,
            });
        }
    }
}
export {CategoriaController}