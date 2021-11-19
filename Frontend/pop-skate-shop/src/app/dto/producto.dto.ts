export class ProductoDto {
  _id: String;
  nombre: String;
  marca: String;
  precio: Number;
  categoria: String;
  disponible: Boolean;
  stock: Number;
  descuento: Number;
  esParteObligatoria: { type: Boolean, default:'false'};
}
