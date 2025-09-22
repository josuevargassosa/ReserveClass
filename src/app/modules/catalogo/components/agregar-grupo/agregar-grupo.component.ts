import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { IResponseGeneral } from 'src/app/core/interfaces/response-general.interface';
import { ToastService } from 'src/app/core/services/toast.service';
import Constantes from 'src/app/core/utils/constantes';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-agregar-grupo',
  templateUrl: './agregar-grupo.component.html',
  styleUrls: ['./agregar-grupo.component.scss'],
})
export class AgregarGrupoComponent implements OnInit {
  estados = Constantes.Estados;

  constructor(
    private fb: UntypedFormBuilder,
    public ref: DynamicDialogRef,
    private toastService: ToastService,
    private catalogoService: CatalogoService
  ) {}

  formGroup: UntypedFormGroup = this.fb.group({
    nombre: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    descripcion: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    estado: ['', [Validators.required]],
  });

  ngOnInit(): void {
    console.log('ESTADOSaaa', this.estados);
  }

  validarCampos(campo: string): boolean | null {
    return (
      this.formGroup.controls[campo].errors &&
      this.formGroup.controls[campo].touched
    );
  }

  onChangeGrupo(event?: any) {
    console.log(event.value);
    this.formGroup.get('estado')?.setValue(event.value);
  }

  async guardar() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    let resp: IResponseGeneral;

    try {
      //   if (this.editar) {
      //     resp = await lastValueFrom(this.parametroService.actualizarParametros(dataEnviar));
      //   } else {
      //     resp = await lastValueFrom(this.parametroService.ingresarParametros(dataEnviar));
      //   }
      //   if (resp.codigoError == 0) {
      //     this.globalService.ocultarLoading();
      //     this.toastService.mostrarToastSuccess(this.editar ? 'Registro actualizado' : 'Registro ingresado');
      //     this.cerrarDialog(true);
      //   } else {
      //     console.error(resp.mensajeSistema);
      //     this.globalService.ocultarLoading();
      //     this.toastService.mostrarToastError(resp.mensajeSistema);
      //   }
      const data = {
        name: this.formGroup.get('nombre')!.value,
        descripcion: this.formGroup.get('descripcion')!.value,
        estado: this.formGroup.get('estado')!.value ? 1 : 0,
      };
      this.catalogoService.postGrupo(data).subscribe(
        (res) => {
          this.toastService.mostrarToastSuccess('Grupo creado');
          console.log(res);
          this.cerrarDialog(true);
        },
        (error) => {
          console.log(error);
          this.cerrarDialog(true);
        }
      );
    } catch (error) {
      //   console.error(error);
      //this.globalService.ocultarLoading();
      this.toastService.mostrarToastError('Transacción no procesada');
      this.cerrarDialog(true);
    }
  }

  cerrarDialog(data?: any) {
    this.ref.close(data);
  }
}
