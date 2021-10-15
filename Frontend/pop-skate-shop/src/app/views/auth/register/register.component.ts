import { Component, OnInit } from "@angular/core";
import { RegisterService } from "../../../services/register.service";
import { Router } from "@angular/router";
import { RegistroDto } from "src/app/dto/register.dto";
import { FormControl, FormGroup } from "@angular/forms";
import { User } from "src/app/models/user";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  user: RegistroDto;
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

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
  onSubmit(){
    console.log("safasf");

  }
  doRegister() {
  let objectUser: User = {
    role: "user"
  } as any;
  Object.keys(this.newUserForm.controls).map(key => {
    objectUser[key] = this.newUserForm.controls[key].value;
  });
  // this.registerService.updateUser(objectUser);
  console.log(objectUser);

  this.registerService.registro(objectUser);
}
  ngOnInit(): void {
  }
  // doRegister() {
  //   console.log("TEST")
  //   this.user = {
  //     role: 'user'
  //   } as any;
  //   Object.keys(this.newUserForm.controls).map(key => {
  //     this.user[key] = this.newUserForm.controls[key].value;
  //   });
  //   this.registerService.registro(this.user)
  //     .subscribe(
  //       res => {
  //         console.log(res);
  //         //login
  //         this.router.navigate(['/private']);
  //       },
  //       err => console.log(err)
  //     )
  // }

}
