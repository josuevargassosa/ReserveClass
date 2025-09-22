export interface ITipoColumna {
  class: string;
  title?: string;
  field: Field;
}

export interface ITipoColumnaNotification {
  field:      string;
  header:     string;
  tipo:       string;
  opciones?:  IOpcionNotification[] | undefined;
}

export interface IOpcionNotification {
  label: string,
  value: string,
  cssClass?: string
}



export interface INotificacion {
  asunto: string;
  cuerpo: string;
  fechaEnvio?: string;
  key?: string | null;
  imagenUrl?: string | null;
  value?: string | null;
  version?: VersionPush;
  destinatario?: string[];
  estado?: string | undefined;
  provincias?: Provincia[];
  ciudades?: Ciudad[];
}

export interface INotificacionPush {
  asunto: string;
  cuerpo: string;
  url:string | null;
  fechaEnvio?: string | null;
}

export enum VersionPush {
  version0 = '0',
  version1 = '1',
}

export interface Provincia {
  identidad?:     string;
  provincia?:     string;
  id?:   string;
}

export interface Canton {
  identidad?:     string;
  canton?:   string;
  idProvincia?: string;
}

export interface ICatalogoProvincias {
  provincias?: Provincia[]
  cantones?: Canton[]
}

export interface Ciudad {
  identidad: string,
}

export interface Field {
  formFieldName: string;
  typeField?: string;
  dataField?: ITipoField;
  readOnly: boolean;
  required?: boolean;
  collection?: any[];
  actions: IAction | null;
}

export interface ITipoField {
  //typeField: string;
  filter?: boolean;
}

export interface IAction {
  action: boolean;
  msAction?: string;
  parameters?: boolean;
  body?: boolean;
}
