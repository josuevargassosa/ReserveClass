import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from "@angular/router";
import { AutenticacionService } from "src/app/modules/auth/services/autenticacion.service";

@Injectable({ providedIn: "root" })
export class RoleGuard implements CanActivate {
  constructor(private auth: AutenticacionService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const allowed: string[] = route.data?.["roles"] ?? [];
    const rol = this.auth.usuario?.rol; // 'Administrador' | 'Docente' | 'Coordinador' | undefined
    if (!rol) return this.router.parseUrl("/auth/login");
    return allowed.length === 0 || allowed.includes(rol)
      ? true
      : this.router.parseUrl("/principal"); // o /auth/acceso-denegado
  }
}
