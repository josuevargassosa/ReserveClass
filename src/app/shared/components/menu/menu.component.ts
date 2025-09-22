import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { AutenticacionService } from "src/app/modules/auth/services/autenticacion.service";
import { MenuService } from "src/app/modules/auth/services/menu.service";

type Rol = "Administrador" | "Docente" | "Coordinador";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private menuService: MenuService,
    private authService: AutenticacionService
  ) {}

  ngOnInit(): void {
    this.cargarMenu();
  }

  private cargarMenu(): void {
    const rol = this.authService.usuario?.rol as Rol | undefined;

    // Ítems mínimos por MVP
    const menu: MenuItem[] = [
      {
        label: "Reservas",
        icon: "pi pi-calendar",
        routerLink: ["/principal", "reservas"],
      },
    ];

    // Solo para Administrador (puedes añadir más roles si quieres)
    if (rol === "Administrador") {
      menu.push({
        label: "Catálogos",
        icon: "pi pi-database",
        routerLink: ["/principal", "catalogo"],
      });
      // Ejemplo para el futuro:
      // menu.push({ label: 'Auditoría', icon: 'pi pi-clock', routerLink: ['/principal','auditoria'] });
    }

    this.items = menu;
    this.menuService.menuCargado = true;
  }
}
