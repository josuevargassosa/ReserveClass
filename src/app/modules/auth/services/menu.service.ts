import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MenuItem } from "primeng/api";
import { map, Observable } from "rxjs";
import { Modulo } from "src/app/shared/components/menu/interfaces/Modulo";
import { IMenu } from "src/app/shared/interfaces/menu.interface";
import { environment } from "src/environments/environment";

export type Rol = "Administrador" | "Docente" | "Coordinador";
export interface AppMenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  roles?: Rol[];
  items?: AppMenuItem[];
}

@Injectable({
  providedIn: "root",
})
export class MenuService {
  public menuCargado: boolean = false;

  url: string = `${environment.apiBaseUrl}/general`;
  localhost = `${environment.apiBaseUrl}`;

  // menuCargado = false;
  items: AppMenuItem[] = [];

  constructor(private http: HttpClient) {}

  private all: AppMenuItem[] = [
    {
      label: "Reservas",
      icon: "pi pi-calendar",
      routerLink: "/reservas",
      roles: ["Docente", "Coordinador", "Administrador"],
    },
    {
      label: "Catálogos",
      icon: "pi pi-database",
      routerLink: "/admin",
      roles: ["Administrador"],
    },
    // agrega lo que necesites…
  ];

  loadForRole(rol: Rol) {
    const allow = (i: AppMenuItem) => !i.roles || i.roles.includes(rol);
    const walk = (items: AppMenuItem[]): AppMenuItem[] =>
      items
        .filter(allow)
        .map((i) => ({ ...i, items: i.items ? walk(i.items) : undefined }))
        .filter((i) => !i.items || i.items.length);
    this.items = walk(this.all);
    this.menuCargado = true;
  }

  // getModulos(): Observable<Modulo[]> {
  //   return this.http.post<Modulo[]>(`${this.localhost}/comprobantes/menu`, {
  //     username: "cvargas",
  //   });
  // }

  consultarMenuRol(idRol: number): Observable<MenuItem[]> {
    return this.http
      .get<IMenu[]>(`${this.url}/menu/${idRol}`)
      .pipe(map((x) => this.convertirMenu(x)));
  }

  convertirMenu(menuOrigen: IMenu[]): MenuItem[] {
    let menu: MenuItem[] = [];

    menu.push(
      {
        label: "Dashboard",
        icon: "pi pi-pw pi-home",
        routerLink: ["/principal/dashboard"],
      },
      {
        label: "Mi Perfil",
        icon: "pi pi-pw pi-user",
        routerLink: ["/principal/dashboard"],
      }
    );

    for (let index = 0; index < menuOrigen.length; index++) {
      const element = menuOrigen[index];

      let opcionMenu: MenuItem = {
        label: element.nombre,
        icon: element.icon,
        routerLink: element.url ? [element.url] : undefined,
        items: element.hijos > 0 ? this.convertirSubmenu(element) : undefined,
      };

      menu.push(opcionMenu);
    }

    return menu;
  }

  convertirSubmenu(menuOrigen: IMenu): MenuItem[] {
    let menu: MenuItem[] = [];

    for (let index = 0; index < menuOrigen.submenu!.length; index++) {
      const element = menuOrigen.submenu![index];

      let opcionMenu: MenuItem = {
        label: element.nombre,
        icon: element.icon,
        routerLink: element.url ? [element.url] : undefined,
        items: element.hijos > 0 ? this.convertirSubmenu(element) : undefined,
      };

      menu.push(opcionMenu);
    }

    return menu;
  }

  consultarOpcionesTrxRol(
    idRol: number,
    idTransaccion: number
  ): Observable<IMenu[]> {
    return this.http.get<IMenu[]>(
      `${this.url}/menu-opcion/${idRol}/${idTransaccion}`
    );
  }
}
