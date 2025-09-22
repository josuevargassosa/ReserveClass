import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  mostrarToastError(mensaje: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: mensaje,
    });
  }

  mostrarToastInfo(mensaje: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: mensaje,
    });
  }

  mostrarToastSuccess(mensaje: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: mensaje,
    });
  }

  mostrarConfirmacion(pregunta: string, data?: any): void {
    this.messageService.clear();
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: pregunta,
      detail: 'Confirma para proceder',
      data,
    });
  }

  clear(): void {
    this.messageService.clear();
  }
}
