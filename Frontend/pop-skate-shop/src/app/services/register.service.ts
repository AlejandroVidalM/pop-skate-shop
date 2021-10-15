import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroDto } from '../dto/register.dto';
import { env } from 'process';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerURL = environment.urlBase+'/auth/register';
  constructor(private http: HttpClient, private router: Router) { }
  registro(user: User): Observable<RegistroDto> {
    console.log(this.registerURL);
    console.log(user);
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

  // login(loginDto: String): Observable<RegistroDto> {
  //   return this.http.post<RegistroDto>(
  //     registerURL,
  //     loginDto,
  //     httpOptions
  //   );
  // }


}
