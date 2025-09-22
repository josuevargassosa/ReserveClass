import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IResponseLogin } from "../interfaces/response-login.interface";
import { IUsuarioSesion } from "../interfaces/usuario-session.interface";

@Injectable({
  providedIn: "root",
})
export class AutenticacionService {
  private readonly LOGIN_URL = `${environment.apiBaseUrl}${environment.endpoints.login}`;
  private _usuario?: IUsuarioSesion | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  /** Devuelve una copia del usuario en sesión (o null si no hay). */
  get usuario(): IUsuarioSesion | null {
    if (this._usuario) return { ...this._usuario };
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as IUsuarioSesion) : null;
  }

  isLoggedIn(): boolean {
    console.log("AuthGuard#canActivate called", this.usuario);
    return !!this.usuario;
  }

  loginByEmail(email: string): Observable<IUsuarioSesion> {
    return this.http
      .post<IResponseLogin | IUsuarioSesion>(this.LOGIN_URL, { email })
      .pipe(
        map((resp) => {
          // Normaliza el formato de respuesta
          const ok =
            typeof (resp as any).success === "boolean"
              ? (resp as any).success
              : true;
          if (!ok) {
            const msg = (resp as any)?.message || "Usuario no encontrado";
            throw new Error(msg);
          }
          const user = (resp as any).result ?? resp;
          // Validación mínima
          if (!user || !user.id || !user.email) {
            throw new Error("Respuesta inválida del servidor");
          }
          return user as IUsuarioSesion;
        }),
        tap((user) => {
          this._usuario = user;
          localStorage.setItem("user", JSON.stringify(user));
        })
      );
  }

  logout(): void {
    this._usuario = null;
    this.router.navigateByUrl("/auth/login");
    localStorage.removeItem("user");
  }
}
