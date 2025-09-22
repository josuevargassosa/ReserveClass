import { DynamicDialogRef } from "primeng/dynamicdialog";
import Constantes from "src/app/core/utils/constantes";
import { ITipoColumna, ITipoColumnaNotification } from "src/app/core/interfaces/tipo-columna.interface";
import { IOpcion } from "src/app/core/interfaces/opcion.interface";

export abstract class TemplateTablaAbstract {

    ref?: DynamicDialogRef;
    totalRecords: number = 0;
    cols: ITipoColumnaNotification[] | ITipoColumna[] = [];
    loading: boolean = false;

    public constantes = Constantes;

    opcionesEstado: IOpcion[] = [
        { label: 'pi pi-thumbs-up', value: Constantes.ESTADO_ACTIVO_LABEL },
        { label: 'pi pi-thumbs-down', value: Constantes.ESTADO_INACTIVO_LABEL }
    ];

    opcionesSiNo: IOpcion[] = [
        { label: 'Si', value: Constantes.RESPUESTA_AFIRMATIVA },
        { label: 'No', value: Constantes.RESPUESTA_NEGATIVA }
    ];

    abstract cargarColumnas(): void;
    abstract showDialogAgregar( ev?: any ): void;
    abstract eliminarRegistroTabla( ev: any ): void;
    abstract actualizarRegistroTabla( ev: any ): void;

}