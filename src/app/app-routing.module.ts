import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "auth",
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "principal",
    loadChildren: () =>
      import("./principal/principal.module").then((m) => m.PrincipalModule),
    //  canActivate: [],
    //  canLoad: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
