import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroDto } from '../dto/register.dto';
import { env } from 'process';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../dto/login-dto';

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
  constructor(private http: HttpClient, private router: Router) { }
  registro(user: User): Observable<RegistroDto> {
    return this.http.post<any>(this.registerURL, {
      "nombre": "Luisasdasd Misguel",
      "apellidos": "asd asdasd",
      "email": "asdasdsadasdasd@salesianos.edu3",
      "password": "1234",
      "password2": "1234",
      "provincia": "Seasdasvilla",
      "ciudad": "Sevdsadilla",
      "direccion": "C. Condsades de Bustillo, N 17",
      "codigoPostal": "41010"
    });

    // let test = this.http.post<any>(this.registerURL, user, httpOptions);

  }
  login(loginDto: LoginDto){
    console.log(JSON.stringify(loginDto))
    // {"username":"luismi.lopez@salesianos.edu","password":"123456"}
    let response1 = this.http.post<any>(this.loginURL, {"username":"luismi.lopez@salesianos.edu","password":"123456"} );
    let response2 = this.http.post<any>(this.loginURL, JSON.stringify(loginDto) );
    return response1


  }

  // login(loginDto: String): Observable<RegistroDto> {
  //   return this.http.post<RegistroDto>(
  //     registerURL,
  //     loginDto,
  //     httpOptions
  //   );
  // }


}
