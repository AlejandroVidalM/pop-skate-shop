import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-card-settings",
  templateUrl: "./card-settings.component.html",
})
export class CardSettingsComponent implements OnInit {

  myUser: User;
  newUserForm = new FormGroup({
    nombre: new FormControl(""),
    apellidos: new FormControl(""),
    nombreCompleto: new FormControl(""),
    email: new FormControl(""),
    provincia: new FormControl(""),
    ciudad: new FormControl(""),
    direccion: new FormControl(""),
    codigoPostal: new FormControl(""),
  });
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getPerfil().subscribe(resp => {
      this.myUser = resp.user;

      Object.keys(this.newUserForm.controls).forEach(keyElemento => {
        this.newUserForm.controls[keyElemento].setValue(resp.user[keyElemento]);
      });

    });

  }
}
