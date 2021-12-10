export interface Categoria {
    _id:string;
    nombre:string;
    categoriaPadre:string;
    esParteObligatoria:boolean;
}

export interface CategoriaResponse {
  categoria: Categoria;
}
