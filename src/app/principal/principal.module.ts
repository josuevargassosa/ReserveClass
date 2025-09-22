import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrimeNgModule } from "../modules/prime-ng/prime-ng.module";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { SharedModule } from "../shared/shared.module";
import { PrincipalRoutingModule } from "./principal-routing.module";
import { DateFormatPipe } from "../shared/pipes/date-format.pipe";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { PickerModule } from "@ctrl/ngx-emoji-mart";

import { RouterModule } from "@angular/router";
import { PrincipalPageComponent } from "./principal-page/principal-page.component";

@NgModule({
  declarations: [ErrorPageComponent, PrincipalPageComponent],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PickerModule,
    RouterModule,
  ],
  exports: [ErrorPageComponent],
  providers: [DateFormatPipe],
})
export class PrincipalModule {}
