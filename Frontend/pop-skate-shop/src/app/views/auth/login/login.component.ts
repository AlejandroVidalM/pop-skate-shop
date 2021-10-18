import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
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
      private authServie: AuthService,
      private router: Router
    ) {}
    loginUserForm = new FormGroup({
      username: new FormControl(""),
      password: new FormControl("")
    });
    doLogin(){
      console.log("componente")
      Object.keys(this.loginUserForm.controls).map(key => {
        this.user[key] = this.loginUserForm.controls[key].value;
      });
      this.authServie.login(this.user).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/admin/tables']);
        },
        err => console.log(err)
      );
    }

  ngOnInit(): void {}
}
