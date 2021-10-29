import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaDto } from 'src/app/dto/categoria.dto';
import { Categoria, CategoriaResponse } from 'src/app/models/category.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  categoryList: Array<Categoria>
  categoriaPadre: string = undefined;
  newCategoryForm = new FormGroup({
    nombre: new FormControl(''),
    categoriaPadre: new FormControl(''),
    esParteObligatoria: new FormControl(''),
  });
  constructor(private categoriaService: CategoriaService, private router: Router) { }

  onSubmit() {
    let categoriaDto: CategoriaDto = {
      // id: this.categoryId
    } as any;
    Object.keys(this.newCategoryForm.controls).map(key => {
      categoriaDto[key] = this.newCategoryForm.controls[key].value;
      console.log(this.newCategoryForm.controls[key].value);

      if(categoriaDto[key]== ''){
        categoriaDto[key]=undefined
      }
    });
    this.categoriaService.crearCategoria(categoriaDto).subscribe(

      err => console.log(err)
    );

    this.router.navigate(['/admin/categorias']);

  }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(

      res => {
        this.categoryList=res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

}
