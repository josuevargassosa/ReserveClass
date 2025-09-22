import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-comprobante-imagen-popup',
  templateUrl: './comprobante-imagen-popup.component.html',
  styleUrls: ['./comprobante-imagen-popup.component.scss']
})
export class ComprobanteImagenPopupComponent {
  urlImage: string = '';

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.urlImage = this.config.data.url;
  }
  
}
