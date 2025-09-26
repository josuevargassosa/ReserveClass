import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from "@angular/router";
import { Observable } from "rxjs";
import Constantes from "src/app/core/utils/constantes";
import { AutenticacionService } from "../services/autenticacion.service";

@Injectable({
  providedIn: "root",
})
export class AutenticacionGuard {
  constructor(
    private router: Router,
    private authService: AutenticacionService
  ) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | boolean {
  //     var tokenSesion = localStorage.getItem(Constantes.LOC_KEY_SESSION_ENTRY_ID);
  //     console.log('tokenSesion', tokenSesion)
  //     if (tokenSesion) {
  //       this.authService.validarToken(tokenSesion).subscribe({
  //         next: (data) => {
  //           this.authService.usuario = data;
  //         },
  //         error: (error) => {
  //           console.error(error);
  //           this.router.navigateByUrl('/auth/login');
  //           return false;
  //         }
  //       });
  //       return true;
  //     }
  //     this.router.navigateByUrl('/auth/login');
  //     return false;
  // }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    let tokenSesion = localStorage.getItem(Constantes.LOC_KEY_SESSION_ENTRY_ID);
    console.log("tokenSesion2", tokenSesion);

    if (tokenSesion) {
      return true;
    }

    this.router.navigateByUrl("/auth/login");
    return false;
  }
}
