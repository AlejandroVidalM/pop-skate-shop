import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoDto } from '../dto/producto.dto';
import { ProductoResponse, Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private token = localStorage.getItem('token')

  private authHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };
  private productoURL = environment.urlBase + "/producto";
  private productoNuevaURL = environment.urlBase + "/producto/new";
  constructor(private http: HttpClient, private router: Router) {}
  crearProducto(productoDto: ProductoDto): Observable<ProductoResponse> {

    let res = this.http.post<ProductoResponse>(
      this.productoNuevaURL,
      productoDto,
      this.authHeaders
    );
    return res

  }
  editarProducto(productoDto: ProductoDto): Observable<ProductoResponse>{
    return this.http.put<ProductoResponse>(`${this.productoURL}/${productoDto._id}`, productoDto,this.authHeaders) }

  deleteProducto(id):Observable<ProductoResponse>  {
    return this.http.delete<ProductoResponse>(`${this.productoURL}/${id}`, this.authHeaders)
  }
  getProductos(): Observable<Array<Producto>> {
    return this.http.get<Array<Producto>>(this.productoURL, this.authHeaders)
  }
  findById(id):Observable<any> {
    return this.http.get<any>(`${this.productoURL}/${id}`, this.authHeaders)
  }

}
