import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoDto } from 'src/app/dto/producto.dto';
import { Producto } from 'src/app/models/producto';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
  precioRebajado: number;
  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService,
    private router: Router) { }

  @Input() producto: Producto;


  ngOnInit(): void {
    this.precioRebajado=this.producto.precio - this.producto.precio * this.producto.descuento/100
  }

  add(cantidad): void {
    this.pedidoService.agregarAlCarrito(this.producto._id, {cantidad:cantidad}).subscribe(
      (res) => {
        console.log(res);

        this.router.navigate(["/shop/cart"]);
      },
      (err) => console.log(err)
    );
  }


}
