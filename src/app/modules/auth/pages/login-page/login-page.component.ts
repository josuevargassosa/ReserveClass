import { Component, OnDestroy, Inject, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { InteractionStatus } from "@azure/msal-browser";
import { combineLatest, filter, Observable, Subject, takeUntil } from "rxjs";
import { ToastService } from "src/app/core/services/toast.service";

import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  // isUserLoggedIn: boolean = false;
  // private readonly _destroy = new Subject<void>();
  // loginDisplay: boolean = false;

  loading = false;
  isReadOnly = false;
  formLogin: UntypedFormGroup;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private toast: ToastService,
    private auth: AutenticacionService
  ) {
    this.formLogin = this.fb.group({
      email: [
        null,
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  validarCampos(campo: string): boolean {
    const ctrl = this.formLogin.get(campo);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  ingresar(): void {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) return;

    const email = String(this.formLogin.get("email")?.value || "").trim();
    this.loading = true;
    this.isReadOnly = true;

    this.auth
      .loginByEmail(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.toast.mostrarToastSuccess(
            `Bienvenido, ${user.nombre || user.email}`
          );
          this.router.navigateByUrl("/principal");
          this.loading = false;
          this.isReadOnly = false;
        },
        error: (err) => {
          console.log("ERROR", err);
          const msg = err?.error?.message || "Usuario no encontrado";
          this.toast.mostrarToastError(msg);
          this.loading = false;
          this.isReadOnly = false;
        },
      });
  }

  // logout() {
  //   debugger;

  //   localStorage.clear();
  //   this.authService.logoutRedirect({
  //     postLogoutRedirectUri: environment.azure.postLogoutRedirectUri,
  //   });
  // }
}
