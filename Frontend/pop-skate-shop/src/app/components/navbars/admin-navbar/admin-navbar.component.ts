import { Component, OnInit } from "@angular/core";
import { Pedido } from "src/app/models/pedido";
import { PedidoService } from "src/app/services/pedido.service";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {
  constructor(
    private pedidoService: PedidoService) {}
    carrito:Pedido;
  ngOnInit(): void {
    this.pedidoService.getCarrito().subscribe(
      (res) => {
        console.log(res);
        this.carrito=res.pedido
      },
      (err) => console.log(err)
    );;
  }
}
