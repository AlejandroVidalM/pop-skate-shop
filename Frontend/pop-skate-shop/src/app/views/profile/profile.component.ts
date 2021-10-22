import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";
import { User } from "../../models/user";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  myUser: User;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getPerfil().subscribe(
      (res) => {
        this.myUser = res.user;
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
