import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroDto } from '../dto/register.dto';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../dto/login-dto';
import { loginResponse } from '../dto/loginResponse.dto';
import { registerResponse } from '../dto/registerResponse.dto';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = environment.urlBase+'/auth/register';
  private loginURL = environment.urlBase+'/auth/login';
  constructor( private injector:Injector, public jwtHelper: JwtHelperService, private http: HttpClient, private router: Router) { }
  registro(registroDto: RegistroDto): Observable<registerResponse> {

    return this.http.post<registerResponse>(this.registerURL, registroDto, httpOptions);


  }
  login(loginDto: LoginDto): Observable<loginResponse>{
    console.log(JSON.stringify(loginDto))
    return this.http.post<loginResponse>(this.loginURL, loginDto, httpOptions );


  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(["/auth/login"]);
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const jwtHelper = this.injector.get(JwtHelperService);
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);
  }


}
