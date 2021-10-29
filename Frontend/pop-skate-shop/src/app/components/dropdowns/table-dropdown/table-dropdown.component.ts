import { Component, AfterViewInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Router } from "@angular/router";
import { createPopper } from "@popperjs/core";
import { CategoriaService } from "src/app/services/categoria.service";

@Component({
  selector: "app-table-dropdown",
  templateUrl: "./table-dropdown.component.html",
})
export class TableDropdownComponent implements AfterViewInit {

  constructor(private categoriaService: CategoriaService, private router: Router) {
  }
  dropdownPopoverShow = false;
  @Input() id;
  @Input() entidad;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  editEntity(id): void {
    if(this.entidad == "category") {
      this.router.navigate(['/admin/categorias/edit', id]);
    }
  }
  deleteEntity(id): void {

    if (confirm('¿Deseas eliminar este elemento?')) {
      if(this.entidad == "category") {
        this.categoriaService.deleteCategoria(id).subscribe(

          err => console.log(err)
        );
        this.router.navigate(['/admin/categorias']);
      }

    }
  }
}
