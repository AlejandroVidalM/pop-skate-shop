import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

import { ProductoService } from 'src/app/services/producto.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  productList: Array<Producto>

  constructor(private productoService: ProductoService) { }

  findProductById(id: string): Producto{
    let productFinded: Producto = undefined;
    for (var product of this.productList){

        if(product._id == id){
          productFinded = product;
        }
    }

    return productFinded;
  }
  reloadProductos(){
    this.productoService.getProductos().subscribe(

      res => {
        this.productList=res;

      },
      err => console.log(err)
    );
  }
  ngOnInit(): void {
    this.reloadProductos();
  }

}
