import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoDto } from 'src/app/dto/producto.dto';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {

  constructor(
    private productoService: ProductoService,
    private router: Router) { }

  @Input() producto: Producto;


  ngOnInit(): void {

  }
  add(): void {

  }


}
