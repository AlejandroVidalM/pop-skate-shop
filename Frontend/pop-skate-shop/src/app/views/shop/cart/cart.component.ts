import { Component, OnInit } from '@angular/core';
import { LineaPedido } from 'src/app/models/lineaPedido';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  [x: string]: any;
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  carrito: any;
  lineasPedido: Array<LineaPedido>
  productList: Array<Producto>
  constructor(private pedidoService: PedidoService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.reloadCarrito();

  }

  reloadCarrito():void{
    this.pedidoService.getCarrito().subscribe(
      (res) => {
        this.carrito=res
        this.lineasPedido=this.carrito.lineasPedido
      },
      (err) => console.log(err)
    );
    this.productoService.getProductos().subscribe(

      res => {
        this.productList=res;

      },
      err => console.log(err)
    );
  }
  findProductById(id: string): Producto{
    let productFinded: Producto = undefined;
    for (var product of this.productList){

        if(product._id == id){
          productFinded = product;
        }
    }

    return productFinded;
  }
  quitar(id: string): void {
    this.pedidoService.removeLinea(id).subscribe((rep) => {
      this.reloadCarrito();
    });
  }

}
