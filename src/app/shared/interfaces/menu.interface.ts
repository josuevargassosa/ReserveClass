import { Type } from "@angular/core";

export class IMenu {
    id!:            number;
    nombre!:        string;
    icon!:          string;
    url!:           string;
    idTransaccion!: number;
    orden!:         number;
    hijos!:         number;
    estado!:        string;
    submenu!:       IMenu[] | null;
    component!:     Type<any> | null;
    
}