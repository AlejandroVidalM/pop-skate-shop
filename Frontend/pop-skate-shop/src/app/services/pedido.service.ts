import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidoResponse } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private token = localStorage.getItem('token')

  private authHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };
  private CarritoUrl = environment.urlBase + "/carrito";
  constructor(private http: HttpClient, private router: Router) { }
  agregarAlCarrito(productoId, cantidad): Observable<PedidoResponse>{
    let result = this.http.post<PedidoResponse>(`${this.CarritoUrl}/${productoId}`, cantidad, this.authHeaders);
    console.log(result);
    return result;

  }
  getCarrito():Observable<PedidoResponse>{
    let result = this.http.get<PedidoResponse>(`${this.CarritoUrl}`, this.authHeaders);
    console.log(result);
    return result;
  }
  removeLinea(id):Observable<PedidoResponse>  {
    return this.http.delete<PedidoResponse>(`${this.CarritoUrl}/delete/${id}`, this.authHeaders);
  }
  buy():Observable<PedidoResponse> {
    console.log(this.token);

    return this.http.post<PedidoResponse>(`${this.CarritoUrl}/buy`, this.authHeaders);
  }
}
