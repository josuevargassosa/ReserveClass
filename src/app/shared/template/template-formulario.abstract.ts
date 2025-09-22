import { DynamicDialogRef } from 'primeng/dynamicdialog';
import Constantes from 'src/app/core/utils/constantes';
import { ITipoColumna } from 'src/app/core/interfaces/tipo-columna.interface';
import { IOpcion } from 'src/app/core/interfaces/opcion.interface';

export abstract class TemplateFormularioAbstract {
  cols: ITipoColumna[] = [];
  // ref?: DynamicDialogRef;
  // totalRecords: number = 0;
  // loading: boolean = false;

  public constantes = Constantes;
  protected collectionSelect = [];

  // opcionesEstado: IOpcion[] = [
  //     { label: 'pi pi-thumbs-up', value: Constantes.ESTADO_ACTIVO_LABEL },
  //     { label: 'pi pi-thumbs-down', value: Constantes.ESTADO_INACTIVO_LABEL }
  // ];

  // opcionesSiNo: IOpcion[] = [
  //     { label: 'Si', value: Constantes.RESPUESTA_AFIRMATIVA },
  //     { label: 'No', value: Constantes.RESPUESTA_NEGATIVA }
  // ];

  abstract createForm(): void;
  abstract confirmForm(): void;
  abstract onChangeSelect(
    e: string | number | boolean,
    col: ITipoColumna
  ): void;
  //Creame la funcion onChangeSelect con la propiedad de collectionSelect
  // abstract onChangeSelect(e: any, col: ITipoColumna): void;

  // abstract actualizarRegistroTabla( ev: any ): void;
}
