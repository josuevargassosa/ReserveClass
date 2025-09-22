import { Component, OnInit } from "@angular/core";
import { GlobalService } from "src/app/core/services/global.service";
import { ToastService } from "src/app/core/services/toast.service";
import { IUsuarioSesion } from "src/app/modules/auth/interfaces/usuario-session.interface";
import { AutenticacionService } from "src/app/modules/auth/services/autenticacion.service";
import { MenuService } from "src/app/modules/auth/services/menu.service";

type Rol = "Administrador" | "Docente" | "Coordinador";

@Component({
  selector: "app-principal-page",
  templateUrl: "./principal-page.component.html",
  styleUrls: ["./principal-page.component.scss"],
})
export class PrincipalPageComponent implements OnInit {
  constructor(
    private toastService: ToastService,
    public globalService: GlobalService,
    private authService: AutenticacionService,
    private menuService: MenuService
  ) {}

  get usuario(): IUsuarioSesion | null {
    return this.authService.usuario;
  }

  get menuCargado(): boolean {
    return this.menuService.menuCargado;
  }

  ngOnInit(): void {
    const rol = this.usuario?.rol as Rol | undefined;
    if (rol) {
      this.menuService.loadForRole(rol); // <- carga items visibles para ese rol
    }
  }

  onReject(): void {
    this.toastService.clear();
  }
}
