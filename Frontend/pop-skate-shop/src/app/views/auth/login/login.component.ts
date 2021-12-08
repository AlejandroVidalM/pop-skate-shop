import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginDto } from "src/app/dto/login-dto";
import { AuthService } from "src/app/services/auth.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
    user: LoginDto= new LoginDto();
    constructor(
      private authService: AuthService,
      private router: Router
    ) {}
    loginUserForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
    doLogin(){
      console.log("componente")
      Object.keys(this.loginUserForm.controls).map(key => {
        this.user[key] = this.loginUserForm.controls[key].value;
      });
      this.authService.login(this.user).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin/productos']);
        },
        error =>{
          if(error.status == 401) {
            alert('Datos de login incorrectos');
          } else {
            alert('Error del servidor');
          }
          console.log(error)
        }

      );
    }

  ngOnInit(): void {}
}
