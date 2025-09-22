import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CislatamRoutes } from './cislatam.routing';
import { PrincipalRoutingModule } from 'src/app/principal/principal-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { AprobarComprobantesComponent } from './pages/aprobar-comprobantes/aprobar-comprobantes.component';
import { PrincipalModule } from 'src/app/principal/principal.module';
import { SharedModule } from "../../shared/shared.module";
import { VerComprobantesComponent } from './pages/ver-comprobantes/ver-comprobantes.component';
import { RechazarComprobantePopupComponent } from './pages/rechazar-comprobante-popup/rechazar-comprobante-popup.component';
@NgModule({
  declarations: [
    AprobarComprobantesComponent,
    VerComprobantesComponent,
    RechazarComprobantePopupComponent,
  ],
  imports: [
    CommonModule,
    CislatamRoutes,
    PrincipalRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    PrincipalModule,
    ReactiveFormsModule,
    ButtonModule,
    PickerModule,
    
    
]
})
export class CislatamModule { }
