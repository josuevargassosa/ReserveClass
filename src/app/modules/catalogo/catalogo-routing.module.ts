import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GrupoPageComponent } from "./pages/grupo-page/grupo-page.component";
import { ProductoPageComponent } from "./pages/producto-page/producto-page.component";
// import { NotificationsComponent } from 'src/app/principal/notifications/notifications.component';
import { AprobarComprobantesComponent } from "../cislatam/pages/aprobar-comprobantes/aprobar-comprobantes.component";
import { CislatamModule } from "../cislatam/cislatam.module";
import { LaboratoriosPageComponent } from "./pages/laboratorios-page/laboratorios-page.component";
import { AsignaturasPageComponent } from "./pages/asignaturas-page/asignaturas-page.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "grupo",
        component: GrupoPageComponent,
        data: { breadcrumb: "Grupo" },
      },
      {
        path: "producto",
        component: ProductoPageComponent,
        data: { breadcrumb: "Producto" },
      },
      {
        path: "laboratorios",
        component: LaboratoriosPageComponent,
        data: { breadcrumb: "Laboratorios" },
      },
      {
        path: "asignaturas",
        component: AsignaturasPageComponent,
        data: { breadcrumb: "Asignaturas" },
      },
      {
        path: "cislatam",
        loadChildren: () => CislatamModule,
        data: { breadcrumb: "cislatam" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogoRoutingModule {}
