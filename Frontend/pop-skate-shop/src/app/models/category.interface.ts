export interface Categoria {
    id:string;
    nombre:string;
    categoriaPadre:string;
    esParteObligatoria:boolean;
}

export interface CategoriaResponse {
  user: Categoria;
}
