export interface Group {
  value?: number;
  name: string;
  descripcion: string;
  estado: number;
  nombreKey?: string;
  fechaCreacion?: string;
  fechaModificacion?: string;
  elementos?: string;
}

export interface GroupElements {
  idGrupo: number;
  idElemento: number;
  tipoElemento: string;
  fechaCreacion: string;
}
