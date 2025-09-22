import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoRoutingModule } from './catalogo-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogService } from 'primeng/dynamicdialog';
import { GrupoPageComponent } from './pages/grupo-page/grupo-page.component';
import { AgregarGrupoComponent } from './components/agregar-grupo/agregar-grupo.component';
import { ProductoPageComponent } from './pages/producto-page/producto-page.component';

@NgModule({
  declarations: [GrupoPageComponent, AgregarGrupoComponent, ProductoPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule,
    CatalogoRoutingModule,
  ],
  providers: [DialogService],
})
export class CatalogoModule {}
