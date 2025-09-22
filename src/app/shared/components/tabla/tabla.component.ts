import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { IOpcion } from "src/app/core/interfaces/opcion.interface";
import { ToastService } from "src/app/core/services/toast.service";
import Constantes from "src/app/core/utils/constantes";
import { IAcction } from "src/app/modules/cislatam/interfaces/comprobante.interface";

// import { IAcction } from 'src/app/modules/usuario/pages/usuario-page/usuario-page.component';

@Component({
  selector: "app-tabla",
  templateUrl: "./tabla.component.html",
  styleUrls: ["./tabla.component.scss"],
})
export class TablaComponent implements OnInit, OnChanges {
  public globalConstantes = Constantes;

  @Input() dataKey?: string | undefined = "";
  @Input() collection?: string | undefined = "";
  @Input() dataArray: any[] = [];
  @Input() loading: boolean = false;
  @Input() cols: any[] = [];
  @Input() rows: number = 5;
  @Input() mostrarEstado: boolean = true;
  @Input() acciones: any[] = [];
  @Input() multiAcciones?: IAcction[] = [];
  @Input() showMultiAcciones?: boolean = false;
  @Output() editar = new EventEmitter();
  @Output() eliminar = new EventEmitter();
  @Output() actualizarEstado = new EventEmitter();
  // @Output() verComprobante = new EventEmitter();
  @Output() descargarComprobante = new EventEmitter();
  @Output() aprobarComprobante = new EventEmitter();
  @Output() rechazarComprobante = new EventEmitter();
  @Output() detalle = new EventEmitter();

  checked: boolean = false;

  habilitar = true;
  desactivar = false;

  estadoActivoCompuesto = false;
  estadoActivoSimple = false;
  estadoInactivoCompuesto = false;
  estadoInactivoSimple = false;

  estadoActivo = true;
  estadoInactivo = false;

  dataArrayClonados: any[] = [];

  urlImagen: string = "";

  iconAdd = "pi pi-plus-circle";

  opcionesEstado: IOpcion[] = [
    { label: "pi pi-thumbs-up", value: Constantes.ESTADO_ACTIVO_SIMPLE },
    { label: "pi pi-thumbs-down", value: Constantes.ESTADO_INACTIVO_SIMPLE },
  ];

  constructor(
    private toastService: ToastService // private userServices: UsuarioService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {}

  obtenerLabelList(
    key: string | boolean,
    opciones: IOpcion[],
    data?: any
  ): string {
    // console.log('key', key, 'opciones', opciones, 'data', data);
    // key = (key == true ? Constantes.ESTADO_ACTIVO_COMPUESTO : Constantes.ESTADO_INACTIVO_COMPUESTO)
    if (opciones && opciones.length == 0) {
      return "N/A";
    } else if (!opciones) {
      return "N/A";
    }

    let opcion = opciones.find((x) => x.value == key);

    if (opcion) {
      return opcion.label;
    } else {
      return "N/A";
    }
  }

  obtenerCssClassList(key: string | boolean, opciones: IOpcion[]): string {
    // key = (key == true ? Constantes.ESTADO_ACTIVO_COMPUESTO : Constantes.ESTADO_INACTIVO_COMPUESTO)

    if (opciones && opciones.length == 0) {
      return "";
    } else if (!opciones) {
      return "";
    }

    let opcion = opciones.find((x) => x.value == key);

    if (opcion) {
      return opcion.cssClass || "";
    } else {
      return "";
    }
  }

  onRowEditInit(item: any, tipoAccion: String) {
    // item.estado = (item.estado == true ? 'A' : 'I')
    // this.dataArrayClonados[item.descripcion] = { ...item };
    // this.editar.emit(item);
    switch (tipoAccion) {
      case Constantes.ACCION_APROBAR:
        this.aprobarComprobante.emit(item);
        break;
      case Constantes.ACCION_DESCARGAR:
        this.descargarComprobante.emit(item);
        break;
      case Constantes.ACCION_RECHAZAR_COMPROBANTE:
        this.rechazarComprobante.emit(item);
        break;
      // case Constantes.ACCION_VER:
      //     this.verComprobante.emit(item);
      // break;
      case Constantes.ACCION_EDITAR:
        this.editar.emit(item);
        break;
      case Constantes.ACCION_ELIMINAR:
        this.eliminar.emit(item);
        break;
      case Constantes.ACCION_VER:
        this.detalle.emit(item);
        break;
      case Constantes.ACCION_APROBAR:
        const aprobar = {
          item: item,
          estado: true,
        };
        this.actualizarEstado.emit(aprobar);
        break;
      case Constantes.ACCION_RECHAZAR:
        let rechazar = {
          item: item,
          estado: false,
        };
        this.actualizarEstado.emit(rechazar);
        break;
      default:
        break;
    }
  }

  onRowDelete(item: any) {
    item.aceptar = () => this.eliminar.emit(item);
    item.rechazar = () => this.toastService.clear();
    this.toastService.mostrarConfirmacion(
      "Estás seguro de eliminar el registro?",
      item
    );
  }

  onRowEditSave(item: any) {
    delete this.dataArrayClonados[item.descripcion];
  }

  onRowEditCancel(item: any, index: number) {
    this.dataArray[index] = this.dataArrayClonados[item.descripcion];
    delete this.dataArrayClonados[item.descripcion];
  }

  actualizarEstadoRow(item: any, event: boolean, tipoAccion?: String) {
    if (tipoAccion == this.globalConstantes.TIPO_COLUMNA_CHECK) {
      const data = {
        item: item,
        estado: event,
        tipoAccion: tipoAccion,
      };
      this.actualizarEstado.emit(data);
    } else {
      if (event) {
        item.estado = item.estado == "I" ? "A" : "ACT";
      } else {
        item.estado = item.estado == "A" ? "I" : "INA";
      }
      this.actualizarEstado.emit(item);
    }
  }

  validar(data: any): boolean {
    var es = false;
    return (es = data == "A" ? true : false);
  }
}
