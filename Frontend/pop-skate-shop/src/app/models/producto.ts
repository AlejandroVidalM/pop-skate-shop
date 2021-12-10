export interface Producto {
  _id: string,
  nombre: string,
  marca: string,
  precio: number,
  categoria: string,
  disponible: boolean,
  stock: number,
  descuento: number,
  imgUrl: string,
  esParteObligatoria: { type: boolean, default:'false'},
}

export interface ProductoResponse {
  producto: Producto;
}
