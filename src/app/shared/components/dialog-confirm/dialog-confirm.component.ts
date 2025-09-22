import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  mensaje: string = '';

  constructor(
    public ref: DynamicDialogRef,
    private dialogService: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.mensaje = this.dialogService.data!.mensaje;
  }

  aceptar() {
    this.ref.close(true)
  }
  cancelar() {
    this.ref.close()
  }

}
