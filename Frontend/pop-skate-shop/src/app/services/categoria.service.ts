import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Categoria, CategoriaResponse } from "../models/category.interface";
import { CategoriaDto } from "../dto/categoria.dto";


@Injectable({
  providedIn: "root",
})

export class CategoriaService {

  private token = localStorage.getItem('token')

  private authHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };
  private categoriaURL = environment.urlBase + "/categoria";
  private categoriaNuevaURL = environment.urlBase + "/categoria/new";
  constructor(private http: HttpClient, private router: Router) {}
  crearCategoria(categoriaDto: CategoriaDto): Observable<CategoriaResponse> {

    let res = this.http.post<CategoriaResponse>(
      this.categoriaNuevaURL,
      categoriaDto,
      this.authHeaders
    );
    return res

  }
  getCategorias(): Observable<Array<CategoriaResponse>> {
    return this.http.get<Array<CategoriaResponse>>(this.categoriaURL, this.authHeaders)
  }
  // getPerfil(): Observable<userResponse> {

  //   let token = localStorage.getItem('token')

  //   const authHeaders = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     })
  //   };
  //   return this.http.get<userResponse>(this.perfilURL, authHeaders);

  // }
}
