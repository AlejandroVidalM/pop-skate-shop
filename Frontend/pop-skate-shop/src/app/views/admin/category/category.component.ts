import { Component, OnInit } from '@angular/core';
import { Categoria, CategoriaResponse } from 'src/app/models/category.interface';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  categoryList: Array<Categoria>

  constructor(private categoriaService: CategoriaService) { }

  findCategoryById(id: string): Categoria{
    let categoryFinded: Categoria = undefined;
    for (var category of this.categoryList){

        if(category._id == id){
          categoryFinded = category;
        }
    }

    return categoryFinded;
  }
  reloadCategorias(){
    this.categoriaService.getCategorias().subscribe(

      res => {
        this.categoryList=res;

      },
      err => console.log(err)
    );
  }
  ngOnInit(): void {
    this.reloadCategorias();
  }


}
