import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public bloquearPantalla: boolean  = false;
  public mostrarMenu: boolean  = true;

  constructor() { }

  mostrarLoading() {
    this.bloquearPantalla = true;
  }

  ocultarLoading() {
    this.bloquearPantalla = false;
  }

  mostrarOcultarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
