import { Component } from "@angular/core";
import { TemplateTablaAbstract } from "src/app/shared/template/template-tabla.abstract";
import { ToastService } from "src/app/core/services/toast.service";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import Constantes from "src/app/core/utils/constantes";
import {
  Accion,
  Comprobante,
  IAcction,
} from "../../interfaces/comprobante.interface";
import { RechazarComprobantePopupComponent } from "../rechazar-comprobante-popup/rechazar-comprobante-popup.component";
import { ComprobanteImagenPopupComponent } from "../comprobante-imagen-popup/comprobante-imagen-popup.component";
import { DropdownChangeEvent } from "primeng/dropdown";
import { CislatamService } from "../../services/cislatam.service.service";
import * as JSZip from "jszip";
import { SelectItem } from "primeng/api";

@Component({
  selector: "app-comprobantes.cislatam",
  templateUrl: "./aprobar-comprobantes.component.html",
  styleUrls: ["./aprobar-comprobantes.component.scss"],
})
export class AprobarComprobantesComponent extends TemplateTablaAbstract {
  comprobantes: Comprobante[] = [];
  //loading: boolean = false;
  acciones: IAcction[] = [
    {
      icon: "pi pi-eye",
      label: "General",
      accion: "accion-editar-usuario",
      visible: true,
      tipoAccion: Constantes.ACCION_VER,
    },
    {
      icon: "pi pi-download",
      label: "General",
      accion: "accion-eliminar-usuario",
      visible: true,
      tipoAccion: Constantes.ACCION_DESCARGAR,
    },
    {
      icon: "pi pi-check",
      label: "General",
      accion: "accion-eliminar-usuario",
      visible: true,
      tipoAccion: Constantes.ACCION_APROBAR,
    },
    {
      icon: "pi pi-times",
      label: "General",
      accion: "accion-eliminar-usuario",
      visible: true,
      tipoAccion: Constantes.ACCION_RECHAZAR_COMPROBANTE,
    },
  ];

  periodOptions: any[] | undefined;
  selectedPeriod: any;
  displayConfirmDialogAprove: boolean = false;
  idAproved: number = -1;

  constructor(
    //servicio de comprobantes
    public toastService: ToastService,
    public dialogService: DialogService,
    public cislatamService: CislatamService
  ) {
    super();
  }

  ngOnInit() {
    this.loading = true;
    this.cargarColumnas();
    //this.consultarNotificaciones();
    //this.cargarComprobantes();
    this.initializePeriods();
    this.loading = false;
  }

  cargarColumnas(): void {
    this.cols = [
      {
        field: "FechaCreacion",
        header: "Fecha",
        tipo: Constantes.TIPO_COLUMNA_FECHA,
      },
      { field: "Car", header: "Car", tipo: Constantes.TIPO_COLUMNA_TEXTO },
      {
        field: "Cliente",
        header: "Cliente",
        tipo: Constantes.TIPO_COLUMNA_TEXTO,
      },
      {
        field: "identificacion",
        header: "Identificacion",
        tipo: Constantes.TIPO_COLUMNA_TEXTO,
      },
      { field: "MTCN", header: "MTCN", tipo: Constantes.TIPO_COLUMNA_TEXTO },
      {
        field: "ValorTotal",
        header: "Valor",
        tipo: Constantes.TIPO_COLUMNA_TEXTO,
      },
      {
        field: "Estado",
        header: "Estado",
        tipo: Constantes.TIPO_COLUMNA_TEXTO,
      },
      {
        field: "Acciones",
        header: "Acciones",
        tipo: Constantes.TIPO_COLUMNA_ACCIONES,
      },
    ];
  }

  confirm() {
    if (this.idAproved != -1) {
      console.log(this.idAproved);
      let username = localStorage.getItem("username");
      if (username !== null) {
        this.cislatamService
          .aceptarComprobante(this.idAproved, username)
          .subscribe((resp) => {
            if (resp.statusCode == 200) {
              this.toastService.mostrarToastSuccess("Comprobante Aceptado");
              this.idAproved = -1;
            } else
              this.toastService.mostrarToastError(
                "inconvenientes al aprobar el comprobante"
              );
          });
      } else {
        this.toastService.mostrarToastError(
          "Debe iniciar sesión para realizar esta acción"
        );
      }
    }
    this.displayConfirmDialogAprove = false;
    this.cargarComprobantes();
    setTimeout(() => {
      this.changeFilter(this.selectedPeriod);
    }, 1000);
  }

  cancel() {
    this.displayConfirmDialogAprove = false;
  }

  onDownload($event: MouseEvent) {}

  onView() {
    console.log("log");
  }

  /**Metodo para descargar todos los comprobantes */
  download($event: MouseEvent) {
    if (this.comprobantes && this.comprobantes.length > 0) {
      console.log(this.comprobantes);

      const zip = new JSZip();
      const promises = this.comprobantes.map((comprobante) => {
        if (comprobante.Adjunto) {
          const imageUrl = comprobante.Adjunto;
          return fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
              const fileName = `${comprobante.MTCN}_${comprobante.Cliente}.png`;
              zip.file(fileName, blob);
            })
            .catch((error) =>
              console.error("Error al descargar la imagen:", error)
            );
        } else {
          console.error(
            "No hay URL de imagen disponible para el comprobante:",
            comprobante
          );
          return Promise.resolve(); // Resolvemos la promesa en caso de error para seguir con el siguiente comprobante
        }
      });

      Promise.all(promises).then(() => {
        zip
          .generateAsync({ type: "blob" })
          .then((content) => {
            const link = document.createElement("a");
            const url = URL.createObjectURL(content);
            link.href = url;
            link.download = "comprobantes.zip"; // Nombre del archivo ZIP
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url); // Liberar memoria
          })
          .catch((error) =>
            console.error("Error al generar el archivo ZIP:", error)
          );
      });
    } else {
      this.toastService.mostrarToastInfo(
        "No hay comprobantes disponibles para descargar."
      );
    }
  }

  cargarComprobantes(): void {
    this.cislatamService.cargarComprobantes().subscribe({
      next: (data) => {
        this.comprobantes = data.map((comprobante) => {
          if (comprobante.FechaCreacion) {
            const fechaCreacion = new Date(comprobante.FechaCreacion);
            comprobante.FechaCreacion = this.formatearFechaUTC(fechaCreacion);
          }
          return comprobante;
        });
      },
      error: (error) => {
        console.error(error);
        this.comprobantes = [];
        this.toastService.mostrarToastError(
          "Servicio no disponible. Consulte con el administrador"
        );
      },
    });
  }

  initializePeriods(): void {
    // this.periodOptions = [
    //   { label: 'Todos', value: '' },
    //   { label: 'Enero 2024', value: 202401 },
    //   { label: 'Febrero 2024', value: 202402 },
    //   { label: 'Marzo 2024', value: 202403 },
    //   { label: 'Abril 2024', value: 202404 },
    //   { label: 'Mayo 2024', value: 202405 },
    //   { label: 'Junio 2024', value: 202406 },
    //   { label: 'Julio 2024', value: 202407 },
    //   { label: 'Agosto 2024', value: 202408 },
    //   { label: 'Septiembre 2024', value: 202409 },
    //   { label: 'Octubre 2024', value: 202410 },
    //   { label: 'Noviembre 2024', value: 202411 },
    //   { label: 'Diciembre 2024', value: 202412 },
    //   { label: 'Enero 2025', value: 202501 },
    //   { label: 'Febrero 2025', value: 202502 },
    // ];

    console.log("Inicializando periodos...");

    this.setPeriods({ startYm: 202409, includeAll: true, order: "desc" });
  }

  private setPeriods(opts: {
    startYm?: number; // ej. 202401
    endYm?: number; // opcional, default = mes actual
    monthsBack?: number; // alternativa a startYm: p.ej. 12, 18, 24…
    includeAll?: boolean; // agrega "Todos"
    order?: "asc" | "desc";
  }) {
    const {
      startYm,
      endYm,
      monthsBack,
      includeAll = true,
      order = "desc",
    } = opts;

    const today = new Date();
    const end = endYm
      ? this.ymToDate(endYm)
      : new Date(today.getFullYear(), today.getMonth(), 1);

    const start = startYm
      ? this.ymToDate(startYm)
      : new Date(
          end.getFullYear(),
          end.getMonth() - ((monthsBack ?? 12) - 1),
          1
        );

    const items: SelectItem[] = [];
    if (includeAll) items.push({ label: "Todos", value: "" });

    for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
      items.push({ label: this.labelEs(d), value: this.dateToYm(d) });
    }

    console.log("Periodos", items);

    this.periodOptions =
      order === "desc" ? [items[0], ...items.slice(1).reverse()] : items;

    // Selección por defecto (opcional): mes actual o "Todos"
    this.selectedPeriod = this.dateToYm(end); // actual
    this.changeFilter(this.selectedPeriod); // filtrar
    // this.selectedPeriod = '';                 // Todos
  }

  private dateToYm(d: Date): number {
    return d.getFullYear() * 100 + (d.getMonth() + 1); // 202409, etc.
  }

  private ymToDate(ym: number): Date {
    return new Date(Math.floor(ym / 100), (ym % 100) - 1, 1);
  }

  private labelEs(d: Date): string {
    const s = new Intl.DateTimeFormat("es-ES", {
      month: "long",
      year: "numeric",
    }).format(d);
    return s.charAt(0).toUpperCase() + s.slice(1); // "Enero 2024"
  }

  changeFilter(periodo: Date) {
    if (!periodo) this.cargarComprobantes();
    else {
      this.cislatamService
        .getComprobantesPorPeriodo(periodo.toString())
        .subscribe({
          next: (data) => {
            this.comprobantes = data.map((comprobante) => {
              if (comprobante.FechaCreacion) {
                const fechaCreacion = new Date(comprobante.FechaCreacion);
                comprobante.FechaCreacion =
                  this.formatearFechaUTC(fechaCreacion);
              }
              return comprobante;
            });
          },
          error: (error) => {
            console.error(error);
            this.comprobantes = [];
            // this.toastService.mostrarToastError('Servicio no disponible. Consulte con el administrador');
          },
        });
    }
  }

  /** Método para descargar comprobante de la fila */
  downloadComprobante(comprobante: Comprobante) {
    console.log(comprobante.Adjunto);

    if (comprobante.Adjunto) {
      const imageUrl = comprobante.Adjunto;
      fetch(imageUrl, { mode: "cors" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "No se pudo descargar la imagen. Estado: " + response.status
            );
          }
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${comprobante.MTCN}_${comprobante.Cliente}.png`; // Nombre del archivo descargado
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url); // Liberar memoria
        })
        .catch((error) => {
          console.error("Error al descargar la imagen:", error);
          this.toastService.mostrarToastInfo(
            "Ocurrió un error al intentar descargar la imagen."
          );
        });
    } else {
      this.toastService.mostrarToastInfo(
        "No hay URL de imagen disponible para el comprobante."
      );
    }
  }

  verComprobante(ev: any): void {
    this.ref = this.dialogService.open(ComprobanteImagenPopupComponent, {
      width: "50%",
      height: "50%",
      data: ev,
    });

    this.ref.onClose.subscribe((data) => {
      // Aquí puedes manejar el evento de cierre del diálogo
      if (data) {
      }
    });
  }

  aprobarComprobante(ev: Comprobante): void {
    this.displayConfirmDialogAprove = true;
    this.idAproved = ev.Id;
  }

  rechazarComprobante(ev: any): void {
    this.ref = this.dialogService.open(RechazarComprobantePopupComponent, {
      header: "Rechazo de comprobante",
      width: "25%",
      data: ev,
    });

    this.ref.onClose.subscribe((data) => {
      this.cargarComprobantes();
    });
  }

  formatearFechaUTC(fecha: Date): string {
    const dia = ("0" + fecha.getUTCDate()).slice(-2);
    const mes = ("0" + (fecha.getUTCMonth() + 1)).slice(-2); // Los meses son 0-indexados
    const año = fecha.getUTCFullYear();

    // Formato deseado: dd-mm-yyyy HH:MM:SS
    return `${dia}-${mes}-${año} `;
  }

  eliminarRegistroTabla(ev: any): void {
    throw new Error("Method not implemented.");
  }

  actualizarRegistroTabla(ev: any): void {
    throw new Error("Method not implemented.");
  }

  showDialogAgregar(ev?: any): void {
    throw new Error("Method not implemented.");
  }
}
