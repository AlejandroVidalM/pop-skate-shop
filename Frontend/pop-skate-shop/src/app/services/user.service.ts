import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, userResponse } from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private perfilURL = environment.urlBase+'/perfil';
  constructor(private http: HttpClient, private router: Router) { }

  getPerfil(): Observable<userResponse> {

    let token = localStorage.getItem('token')

    const authHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<userResponse>(this.perfilURL, authHeaders);


  }
}
