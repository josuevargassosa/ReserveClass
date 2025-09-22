import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PrincipalPageComponent } from "./principal-page/principal-page.component";
import { AuthGuard } from "../core/guards/auth.guard";
import { RoleGuard } from "../core/guards/role.guard";

const routes: Routes = [
  {
    path: "",
    component: PrincipalPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "reservas" },
      {
        path: "reservas",
        loadChildren: () =>
          import("../modules/reservas/reservas.module").then(
            (m) => m.ReservasModule
          ),
        data: {
          breadcrumb: "Reservas",
          roles: ["Docente", "Coordinador", "Administrador"],
        },
        canActivate: [RoleGuard],
      },
      {
        path: "catalogo",
        loadChildren: () =>
          import("../modules/catalogo/catalogo.module").then(
            (m) => m.CatalogoModule
          ),
        data: { breadcrumb: "Catálogos", roles: ["Administrador"] },
        canActivate: [RoleGuard],
      },
      // {
      //   path: "cislatam",
      //   loadChildren: () =>
      //     import("../modules/cislatam/cislatam.module").then(
      //       (m) => m.CislatamModule
      //     ),
      //   data: { breadcrumb: "Cislatam" },
      // },
      // {
      //   path: "**",
      //   redirectTo: "grupo",
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalRoutingModule {}
