import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AutenticacionService } from "src/app/modules/auth/services/autenticacion.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private auth: AutenticacionService, private router: Router) {}
  canActivate(): boolean | UrlTree {
    console.log("AuthGuard#canActivate called", this.auth.isLoggedIn());
    return this.auth.isLoggedIn() ? true : this.router.parseUrl("/auth/login");
  }
}
