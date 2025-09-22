import { Component, Input, OnInit, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ITipoColumna } from 'src/app/core/interfaces/tipo-columna.interface';
import { ToastService } from 'src/app/core/services/toast.service';
import Constantes from 'src/app/core/utils/constantes';
// import { ProductoPageComponent } from 'src/app/modules/catalogo/pages/producto-page/producto-page.component';
import { CatalogoService } from 'src/app/modules/catalogo/services/catalogo.service';
import { TemplateFormularioAbstract } from '../../template/template-formulario.abstract';
// import { GrupoPageComponent } from 'src/app/modules/catalogo/pages/grupo-page/grupo-page.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent
  extends TemplateFormularioAbstract
  implements OnInit
{
  public globalConstantes = Constantes;

  @Input() override cols: ITipoColumna[] = [];

  // public productoPage = inject(ProductoPageComponent);
  // public grupoPage = inject(GrupoPageComponent);

  form: UntypedFormGroup = this.fb.group({});
  id: number = 0;

  constructor(
    private fb: UntypedFormBuilder,
    private catalogoService: CatalogoService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    console.log('COLS', this.cols);
    if (this.cols.length == 0) {
      return;
    }
    //Add controller and Validators to FORM
    this.cols.forEach((col) => {
      const requiredValidator = col.field.required ? Validators.required : null;
      this.form.addControl(
        col.field.formFieldName!,
        this.fb.control('', requiredValidator)
      );
    });
  }

  clearForm() {
    this.form.reset();
  }

  eventFunction(e: any, col: ITipoColumna) {
    console.log('Event', col);
    switch (col.field.typeField) {
      case 'S':
        this.eventSelect(col);
        break;

      default:
        break;
    }
  }

  eventSelect(col: ITipoColumna) {
    if (col.field.actions?.action) {
    }
  }

  onChangeSelect(e: any, col: ITipoColumna) {
    this.eventFunction(e, col);
    let collection: any = [];
    if (col.field.collection) {
      collection = col.field.collection.find((a) => a.value == e.value);
    }
    this.id = collection['value'];
    console.log('ID', this.id);
    this.cols.forEach((res) => {
      if (res.field.formFieldName == col.field.formFieldName) {
        return;
      }
      if (col.field.actions?.action) {
        this.form
          .get(res.field.formFieldName)
          ?.setValue(
            collection[res.field.formFieldName] == 1
              ? true
              : collection[res.field.formFieldName]
          );
      }
    });
  }

  confirmForm() {
    console.log('ID', this.id);
    console.log('Form', this.form.value);
    this.catalogoService.putProduct(this.id, this.form.value).subscribe(
      () => {
        this.toastService.mostrarToastSuccess('Se guardo correctamente');
        this.clearForm();
        //EMITIR UN EVENTO
      },
      (err) => {
        this.toastService.mostrarToastError('Ocurrio un error');
        console.log('Error', err);
      }
    );
  }
}
