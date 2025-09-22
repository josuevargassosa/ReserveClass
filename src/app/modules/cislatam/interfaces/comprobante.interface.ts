export interface Comprobante {
  Id : number;
  FechaCreacion: string;  // O puede ser Date si se va a manejar como fecha
  Car: string;
  Cliente: string;
  comprobante: string;
  MTCN: string;
  valor: number;
  Estado?: string;
  acciones?: Accion[];
  Adjunto: string;
  IdNumeracion: number;
  observaciones: string;
  extension?: string;
}

export interface Accion {
    nombre: string;
    tipo: 'ver' | 'descargar' | 'aprobar' | 'rechazar';
}

export interface IAcction {
  icon: string;
  label: string;
  accion: string;
  visible: boolean;
  tipoAccion: String;
}

export interface Periodo {
  label: string;
  value: number | string;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}
