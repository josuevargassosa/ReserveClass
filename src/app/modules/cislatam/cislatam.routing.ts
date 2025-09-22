import { Routes, RouterModule } from "@angular/router";
import { AprobarComprobantesComponent } from "./pages/aprobar-comprobantes/aprobar-comprobantes.component";
import { VerComprobantesComponent } from "./pages/ver-comprobantes/ver-comprobantes.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "aprobar",
        component: AprobarComprobantesComponent,
        data: { breadcrumb: "Aprobacion" },
      },
      {
        path: "ver",
        component: VerComprobantesComponent,
        data: { breadcrumb: "Visualizacion" },
      },
    ],
  },
];

export const CislatamRoutes = RouterModule.forChild(routes);
