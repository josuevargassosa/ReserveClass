import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReservasRoutingModule } from "./reservas-routing.module";
import { ReservasPageComponent } from "./pages/reservas-page/reservas-page.component";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ReservasPageComponent],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ReservasModule {}
