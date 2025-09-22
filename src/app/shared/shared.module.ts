import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../modules/prime-ng/prime-ng.module';

import { MenuComponent } from './components/menu/menu.component';
import { DescifraTextoPipe } from './pipes/descifra-texto.pipe';
import { DescifraTextoArrayPipe } from './pipes/descifra-texto-array.pipe';
import { TablaComponent } from './components/tabla/tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstadoPipe } from './pipes/estado.pipe';
import { ImageSelectorComponent } from './components/image-selector/image-selector.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AccesoDenegadoComponent } from './components/acceso-denegado/acceso-denegado.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ImagePipe } from '../shared/pipes/image.pipe';
@NgModule({
  declarations: [
    MenuComponent,
    DescifraTextoPipe,
    DescifraTextoArrayPipe,
    TablaComponent,
    EstadoPipe,
    ImageSelectorComponent,
    BreadcrumbComponent,
    MenuToolbarComponent,
    LoadingComponent,
    AccesoDenegadoComponent,
    DialogConfirmComponent,
    FormularioComponent,
    ImagePipe
  ],
  imports: [CommonModule, FormsModule, PrimeNgModule, ReactiveFormsModule],
  exports: [
    MenuComponent,
    DescifraTextoPipe,
    DescifraTextoArrayPipe,
    EstadoPipe,
    ImageSelectorComponent,
    BreadcrumbComponent,
    MenuToolbarComponent,
    LoadingComponent,
    AccesoDenegadoComponent,
    DialogConfirmComponent,
    FormularioComponent,
    ImagePipe,
    TablaComponent,
  ],
})
export class SharedModule {}
