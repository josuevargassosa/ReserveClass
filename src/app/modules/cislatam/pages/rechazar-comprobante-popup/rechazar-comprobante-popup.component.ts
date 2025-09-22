import { Component, OnInit } from '@angular/core';
import { parse, parseISO, isValid } from 'date-fns';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from 'src/app/core/services/toast.service';
import { CislatamService } from '../../services/cislatam.service.service';

@Component({
  selector: 'app-rechazar-comprobante-popup',
  templateUrl: './rechazar-comprobante-popup.component.html',
  styleUrls: ['./rechazar-comprobante-popup.component.scss'],
})
export class RechazarComprobantePopupComponent implements OnInit {
  observacion: string = '';
  observacionOtros: string = '';
  comprobante: any;
  observacionError: boolean = false;
  displayConfirmDialog: boolean = false;
  dateSelected: string = '';
  motivosRechazo: any[] = [
    { label: 'Archivo incorrecto', value: 'Archivo incorrecto' },
    { label: 'Archivo ilegible', value: 'Archivo ilegible' },
    { label: 'Archivo incompleto', value: 'Archivo incompleto' },
    { label: 'Otros', value: 'Otros' },
  ];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public cislatamService: CislatamService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.comprobante = this.config.data;
    console.log('comprobante:', this.comprobante);
  }

  onAccept(): void {
    if (this.observacion === 'Otros' && this.observacionOtros.trim()) {
      this.observacion = this.observacionOtros; // Si selecciona 'Otros', usamos la observación adicional
      this.displayConfirmDialog = true;
    } else if (this.observacion.trim()) {
      this.displayConfirmDialog = true;
    } else {
      this.observacionError = true;
    }
  }

  confirm(): void {
    let username = localStorage.getItem('username');
    console.log('fecha:', this.comprobante.FechaCreacion);
    if (username) {
      const s = (this.comprobante.FechaCreacion || '').trim();

      // Intento corto: ISO → dd-MM-yyyy → d/M/yyyy HH:mm:ss → yyyy-MM-dd
      let fecha =
        ((d) => (isValid(d) ? d : null))(parseISO(s)) ||
        ((d) => (isValid(d) ? d : null))(parse(s, 'dd-MM-yyyy', new Date())) ||
        ((d) => (isValid(d) ? d : null))(
          parse(s, 'd/M/yyyy HH:mm:ss', new Date())
        ) ||
        ((d) => (isValid(d) ? d : null))(parse(s, 'yyyy-MM-dd', new Date()));

      // if (fecha && this.esFechaDentroDelMes(fecha)) {
      this.cislatamService
        .rechazarComprobante(this.comprobante.Id, this.observacion, username)
        .subscribe((res) => {
          console.log('res rechazo:', res);
          if (res.statusCode == 200)
            this.toastService.mostrarToastSuccess(
              'comprobante rechazado correctamente'
            );
          else
            this.toastService.mostrarToastError(
              'inconvenientes al rechazar el comprobante'
            );
        });
      // } else {
      //   this.toastService.mostrarToastError(
      //     'La fecha de la remesa no está dentro del mes actual'
      //   );
      // }
    } else {
      this.toastService.mostrarToastError(
        'No se ha podido rechazar el comprobante, por favor intentelo más tarde'
      );
    }

    this.displayConfirmDialog = false;
    this.ref.close(this.config.data);
  }

  esFechaDentroDelMes(fechaRemesa: Date): boolean {
    console.log('Fecha de remesa:', fechaRemesa);
    const fechaActual = new Date();

    // Extraer mes y año de la fecha del comprobante
    const mesComprobante = fechaRemesa.getMonth(); // 0 - Enero, 11 - Diciembre
    const anioComprobante = fechaRemesa.getFullYear();

    // Crear una fecha que sea 10 días después del último día del mes del comprobante
    const finPeriodo = new Date(anioComprobante, mesComprobante + 1, 0); // último día del mes
    const fechaLimite = new Date(finPeriodo);
    fechaLimite.setDate(finPeriodo.getDate() + 10); // 10 días después del último día del mes

    // Verificar si la fecha actual es menor o igual a la fecha límite
    console.log('Fecha límite para rechazar:', fechaActual <= fechaLimite);
    return fechaActual <= fechaLimite;
  }

  cancel(): void {
    this.displayConfirmDialog = false;
  }

  onCancel(): void {
    this.ref.close();
  }

  get isValid(): boolean {
    return this.observacion === 'Otros'
      ? this.observacionOtros.trim().length > 0
      : this.observacion.trim().length > 0;
  }
}
