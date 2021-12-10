import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriaDto } from "src/app/dto/categoria.dto";
import {
  Categoria,
  CategoriaResponse,
} from "src/app/models/category.interface";
import { CategoriaService } from "src/app/services/categoria.service";
@Component({
  selector: "app-new-category",
  templateUrl: "./new-category.component.html",
  styleUrls: ["./new-category.component.css"],
})
export class NewCategoryComponent implements OnInit {
  categoryId: string;
  categoryList: Array<Categoria>;
  categoriaPadre: string = undefined;
  categoriaActual;
  newCategoryForm = new FormGroup({
    nombre: new FormControl(""),
    categoriaPadre: new FormControl(""),
    esParteObligatoria: new FormControl(""),
  });
  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onSubmit() {
    let categoriaDto: CategoriaDto = {
      _id: this.categoryId,
    } as any;
    Object.keys(this.newCategoryForm.controls).map((key) => {
      categoriaDto[key] = this.newCategoryForm.controls[key].value;
      console.log(this.newCategoryForm.controls[key].value);

      if (categoriaDto[key] == "") {
        categoriaDto[key] = undefined;
      }
    });
    if (this.categoryId) {
      this.categoriaService.editarCategoria(categoriaDto).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => console.log(err)
      );
    } else {
      this.categoriaService
        .crearCategoria(categoriaDto)
        .subscribe((err) => console.log(err));
    }

    this.router.navigate(["/admin/categorias"]);
  }
  findCategoryById(id: string): Categoria {
    let categoryFinded: Categoria = undefined;
    for (var category of this.categoryList) {
      if (category._id == id) {
        categoryFinded = category;
      }
    }

    return categoryFinded;
  }
  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get("id");
    this.categoriaService.getCategorias().subscribe(
      (res) => {
        this.categoryList = res;
        let categoryFinded: Categoria = undefined;
        if(this.categoryId){
          for (var categoria of res) {
            if (categoria._id == this.categoryId) {
              categoryFinded = categoria;
            }
          }
          Object.keys(this.newCategoryForm.controls).forEach((keyElemento) => {
            this.newCategoryForm.controls[keyElemento].setValue(
              categoryFinded[keyElemento]
            );
          });
        }

        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
