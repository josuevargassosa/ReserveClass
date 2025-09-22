import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { ToastService } from 'src/app/core/services/toast.service';
import Constantes from 'src/app/core/utils/constantes';
// import { IImagen } from 'src/app/modules/imagen/interfaces/imagen.interface';
// import { ImagenService } from 'src/app/modules/imagen/services/imagen.service';
import { EventEmitter } from '@angular/core';
import { enumImagen } from '../../enums/enum-imagen';
import { ImageSelected } from '../../interfaces/image-selected.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss'],
})
export class ImageSelectorComponent implements OnInit {
  @ViewChild('uploadSelect', { static: true }) uploadSelect:
    | FileUpload
    | undefined;
  @Input() formGroup!: UntypedFormGroup;
  @Input() restriccionImage?: string;
  @Input() idDesableSinImagenTab = false;
  @Input() idDesableExternaTab = false;
  @Input() coleccionImg = '';
  @Output() enviarImagen: EventEmitter<any> = new EventEmitter();
  @Output() enviarIdentidadImagenSeleccioanda: EventEmitter<string> =
    new EventEmitter();

  archivoCargado: any;
  imagenSrc: any;
  imagenWidth: any;
  imagenHeight: any;
  imagenPreview = false;
  public enumImagen = enumImagen;
  public constantes = Constantes;
  indexImagenExplorar = -1;
  // imagenesPublicidad: IImagen[] = [];
  ref?: DynamicDialogRef;

  constructor(
    private fb: UntypedFormBuilder,
    // public imagenService: ImagenService,
    private toastService: ToastService,
    public dialogService: DialogService
  ) {}

  opcionesImagen = [{}];

  async ngOnInit(): Promise<void> {
    this.formGroup.addControl('descripcionImagen', new UntypedFormControl(''));
    this.formGroup.addControl('seleccionImagen', new UntypedFormControl(''));
    this.formGroup.addControl('urlImagenExterna', new UntypedFormControl(''));
    this.opcionesImagen = [
      {
        label: 'Sin Imagen',
        value: enumImagen.SinImagen,
        inactive: this.idDesableSinImagenTab,
      },
      { label: 'Nueva', value: enumImagen.Nueva, inactive: false },
      { label: 'Explorar', value: enumImagen.Explorar, inactive: false },
      {
        label: 'Externa',
        value: enumImagen.Externa,
        inactive: this.idDesableExternaTab,
      },
    ];
    await this.cargarDatosIniciales();
  }

  async enviar() {
    let imageSelected: ImageSelected = {
      identidadImagen: '',
      imagenUrlEnviar: '',
    };
    if (
      this.formGroup.get('seleccionImagen')?.value == enumImagen.Nueva &&
      this.archivoCargado == null
    ) {
      this.toastService.mostrarToastError('Se debe seleccionar una imagen');
      return;
    } else if (
      this.formGroup.get('seleccionImagen')?.value == enumImagen.Externa &&
      this.formGroup.get('urlImagenExterna')?.value == null
    ) {
      this.toastService.mostrarToastError('Se debe ingresar la url');
      return;
    } else if (
      this.formGroup.get('seleccionImagen')?.value == enumImagen.Explorar &&
      this.indexImagenExplorar == -1
    ) {
      this.toastService.mostrarToastError(
        'Se debe seleccionar una imagen de la galería'
      );
      return;
    } else {
      imageSelected.imagenUrlEnviar = '';
    }

    if (this.formGroup.get('seleccionImagen')?.value == enumImagen.Externa) {
      imageSelected.imagenUrlEnviar =
        this.formGroup.get('seleccionImagen')?.value;
    }

    // if (this.formGroup.controls.seleccionImagen.value == enumImagen.Explorar) {
    //   imageSelected.imagenUrlEnviar = `${this.imagenService.url}/${
    //     this.coleccionImg
    //   }/${this.imagenesPublicidad[this.indexImagenExplorar].identidad}`;
    //   imageSelected.identidadImagen =
    //     this.imagenesPublicidad[this.indexImagenExplorar].identidad;
    // }

    if (
      this.formGroup.get('seleccionImagen')?.value == enumImagen.Nueva &&
      this.archivoCargado != null
    ) {
      const formData = new FormData();
      formData.append('files', this.archivoCargado);
      formData.append('coleccion', this.coleccionImg);
      formData.append(
        'nombreArchivo',
        (this.archivoCargado.name as string).split('.')[0]
      );
      formData.append(
        'descripcion',
        (
          this.formGroup.get('descripcionImagen')?.value as string
        ).toUpperCase()
      );
      formData.append('tipoImagen', this.constantes.TIPO_IMG_PUBLICIDAD);

      try {
        // let respImg = await lastValueFrom(
        //   this.imagenService.subirImagen(formData)
        // );
        // if (respImg.codigoError == 0) {
        //   imageSelected.imagenUrlEnviar = `${this.imagenService.url}/publicidades/${respImg.identidad}`;
        //   imageSelected.identidadImagen = respImg.identidad;
        // } else {
        //   console.error(respImg.mensajeSistema);
        //   this.toastService.mostrarToastError(respImg.mensajeSistema);
        //   return;
        // }
      } catch (error) {
        console.error(error);
        return;
      }
    }
    this.enviarImagen.emit(imageSelected);
  }

  cargarDatosIniciales() {}

  cargaArchivo(event: any): void {
    this.archivoCargado = event.files[0];
    const fr = new FileReader();
    fr.onload = () => {
      let img = new Image();
      img.onload = () => {
        this.imagenWidth = img.width;
        this.imagenHeight = img.height;

        let restriccion = `${this.imagenWidth}x${this.imagenHeight}`;
        if (restriccion != this.restriccionImage) {
          this.limpiarImagen();
          return;
        }
      };
      img.src = fr.result?.toString() ?? ''; // The data URL
      this.imagenSrc = fr.result?.toString() ?? ''; // The data URL
    };
    fr.readAsDataURL(event.files[0]);
    this.enviarImagen.emit(this.archivoCargado);
  }

  seleccionarImagenExplorar(index: number) {
    this.indexImagenExplorar = index;
    // const identidadImagen = `${
    //   this.imagenesPublicidad[this.indexImagenExplorar].identidad
    // }`;
    // this.enviarIdentidadImagenSeleccioanda.emit(identidadImagen);
  }

  buscarImagenExterna(value: boolean) {
    this.imagenPreview = value;
  }

  limpiarImagen() {
    this.imagenPreview = false;
    this.imagenWidth = null;
    this.imagenHeight = null;
    this.archivoCargado = null;
    this.imagenSrc = null;
    this.uploadSelect?.clear();
    this.indexImagenExplorar = -1;
    this.formGroup.get('urlImagenExterna')?.setValue('');
  }
}
