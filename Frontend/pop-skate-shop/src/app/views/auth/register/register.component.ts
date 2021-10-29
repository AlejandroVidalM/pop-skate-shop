import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RegistroDto } from "src/app/dto/register.dto";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth.service";
import { getProvinces, getCities } from "spanishcities";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  registerDto = new RegistroDto();
  provincias: Array<any> = getProvinces();
  selectedProvincia = null;

  ciudades = getCities(this.selectedProvincia);
  constructor(private authService: AuthService, private router: Router) {}

  newUserForm = new FormGroup({
    nombre: new FormControl(""),
    apellidos: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    password2: new FormControl(""),
    provincia: new FormControl(""),
    ciudad: new FormControl(""),
    direccion: new FormControl(""),
    codigoPostal: new FormControl(""),
  });

  onChange($event) {
    let nombreProvincia: String = this.newUserForm.controls["provincia"].value;
    let provincia = this.provincias.find((p) => p.name == nombreProvincia);
    this.ciudades = getCities(provincia.code);
    this.selectedProvincia = this.toUpper(nombreProvincia);
  }
  toUpper(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (Word) {
        return Word[0].toUpperCase() + Word.substr(1);
      })
      .join(" ");
  }

  doRegister() {
    let registroDto: RegistroDto = {
      role: "user",
    } as any;
    Object.keys(this.newUserForm.controls).map((key) => {
      registroDto[key] = this.newUserForm.controls[key].value;
    });
    registroDto["provincia"] = this.selectedProvincia;
    this.authService.registro(registroDto).subscribe(
      (res) => {
        localStorage.setItem("token", res.token);
        this.router.navigate(["/admin/tables"]);
      },
      (err) => console.log(err)
    );
    // this.authService.registro(registroDto);
  }
  ngOnInit(): void {}
}
