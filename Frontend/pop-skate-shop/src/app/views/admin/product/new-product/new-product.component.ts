import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoDto } from 'src/app/dto/producto.dto';
import { Categoria } from 'src/app/models/category.interface';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productId: string;
  productList: Array<Producto>;
  categoryList: Array<Categoria>;
  productoPadre: string = undefined;
  productoActual;
  newProductForm = new FormGroup({
    nombre: new FormControl(""),
    marca: new FormControl(""),
    precio: new FormControl(""),
    categoria: new FormControl(""),
    disponible: new FormControl(""),
    stock: new FormControl(""),
    descuento: new FormControl(""),
    esParteObligatoria: new FormControl(""),
  });
  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onSubmit() {
    let productoDto: ProductoDto = {
      _id: this.productId,
    } as any;
    Object.keys(this.newProductForm.controls).map((key) => {
      productoDto[key] = this.newProductForm.controls[key].value;
      if (productoDto[key] == "") {
        productoDto[key] = undefined;
      }
    });
    if(this.newProductForm.controls['disponible'].value){
      productoDto['disponible']=true
    }else{
      productoDto['disponible']=false
    }

    if (this.productId) {
      this.productoService.editarProducto(productoDto).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
    } else {
      this.productoService
        .crearProducto(productoDto)
        .subscribe((err) => console.log(err));
    }

    this.router.navigate(["/admin/productos"]);
  }
  findProductById(id: string): Producto {
    let productFinded: Producto = undefined;
    for (var product of this.productList) {
      if (product._id == id) {
        productFinded = product;
      }
    }

    return productFinded;
  }
  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(
      (res) => {
        this.categoryList = res;
        console.log(res);
      },
      (err) => console.log(err)
    );
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");
    this.productoService.getProductos().subscribe(
      (res) => {
        this.productList = res;
        let productFinded: Producto = undefined;
        if(this.productId){
          for (var producto of res) {
            if (producto._id == this.productId) {
              productFinded = producto;
            }
          }
          Object.keys(this.newProductForm.controls).forEach((keyElemento) => {
            this.newProductForm.controls[keyElemento].setValue(
              productFinded[keyElemento]
            );
          });
        }

        console.log(res);
      },
      (err) => console.log(err)
    );
  }

}
