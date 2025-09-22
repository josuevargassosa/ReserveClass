import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/core/services/global.service";
import { AutenticacionService } from "src/app/modules/auth/services/autenticacion.service";

@Component({
  selector: "app-menu-toolbar",
  templateUrl: "./menu-toolbar.component.html",
  styleUrls: ["./menu-toolbar.component.scss"],
})
export class MenuToolbarComponent implements OnInit {
  constructor(
    public globalService: GlobalService,
    private authService: AutenticacionService
  ) {}

  ngOnInit(): void {}

  cerrarSesion() {
    this.authService.logout();
  }
}
