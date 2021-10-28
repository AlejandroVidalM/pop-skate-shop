import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriaDto } from 'src/app/dto/categoria.dto';
import { Categoria, CategoriaResponse } from 'src/app/models/category.interface';
import { CategoriaService } from 'src/app/services/categoria.service';
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  categoryList: Array<CategoriaResponse>
  categoriaPadre: string = undefined;
  newCategoryForm = new FormGroup({
    nombre: new FormControl(''),
    categoriaPadre: new FormControl(''),
    esParteObligatoria: new FormControl(''),
  });
  constructor(private categoriaService: CategoriaService) { }
  onChange($event){
    let categoriaPadre: String = this.newCategoryForm.controls["categoriaPadre"].value
    console.log(this.newCategoryForm.controls["categoriaPadre"]);

    console.log(categoriaPadre);

  }
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

      res => {

        console.log(res);
      },
      err => console.log(err)
    );

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
