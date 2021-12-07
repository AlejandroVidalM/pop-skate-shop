export interface Producto {
  _id: String,
  nombre: String,
  marca: String,
  precio: Number,
  categoria: String,
  disponible: Boolean,
  stock: Number,
  descuento: Number,
  imgUrl: String,
  esParteObligatoria: { type: Boolean, default:'false'},
}

export interface ProductoResponse {
  producto: Producto;
}
