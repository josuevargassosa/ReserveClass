import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import Constantes from 'src/app/core/utils/constantes';
// import { ImagenService } from 'src/app/modules/imagen/services/imagen.service';
import { CatalogoService } from '../../services/catalogo.service';
import { Group } from '../../interfaces/group.interface';
import { Products } from '../../interfaces/products.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AgregarGrupoComponent } from '../../components/agregar-grupo/agregar-grupo.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { ITipoColumna } from 'src/app/core/interfaces/tipo-columna.interface';

interface ElementsGroup {
  idElemento: number;
  idGrupo: number;
  nombre: string;
  tipoElemento: string;
}

@Component({
  selector: 'app-grupo-page',
  templateUrl: './grupo-page.component.html',
  styleUrls: ['./grupo-page.component.scss'],
})
export class GrupoPageComponent implements OnInit {
  elements: ElementsGroup[] = [];
  groups: Group[] = [];
  products: Products[] = [];
  estados = Constantes.Estados;
  ref?: DynamicDialogRef;
  cols: ITipoColumna[] = [];

  public constantes = Constantes;

  constructor(
    private fb: UntypedFormBuilder,
    // public imagenService: ImagenService,
    private catalogoService: CatalogoService,
    private toastService: ToastService,
    public dialogService: DialogService //private toastService: ToastService
  ) {}

  formGroup: UntypedFormGroup = this.fb.group({
    grupoId: [null, Validators.required],
    nombre: ['', [Validators.maxLength(100), Validators.required]],
    descripcion: ['', [Validators.required, Validators.maxLength(50)]],
    estado: ['', Validators.required],
    nombreKey: [''],
    elementos: [[]],
    productos: [[]],
    grupos: [[]],
  });

  ngOnInit() {
    this.getProducts();
    this.getDataGroups();
  }

  cargarColumnas() {
    console.log('Cargar Columnas');
    this.cols = [
      {
        class: 'col-lg-12 p-ai-center justify-content-center',
        title: 'Grupo',
        field: {
          formFieldName: 'grupo',
          typeField: 'S',
          readOnly: false,
          required: true,
          collection: this.groups,
          actions: {
            action: true,
            msAction: 'admin/grupo/elementos/',
            parameters: true,
            body: false,
          },
        },
      },

      {
        class: 'col-lg-6 p-ai-center justify-content-center',
        title: 'Nombre',
        field: {
          formFieldName: 'name',
          typeField: 'T',
          readOnly: false,
          required: true,
          actions: null,
        },
      },

      {
        class: 'col-lg-3 col-sm-6 p-ai-center justify-content-center',
        title: 'Imagen',
        field: {
          formFieldName: 'nombreKey',
          typeField: 'T',
          readOnly: true,
          required: false,
          actions: null,
        },
      },
      {
        class: 'col-lg-3 col-sm-6 p-ai-center justify-content-center',
        title: 'Estado',
        field: {
          formFieldName: 'estado',
          typeField: 'S',
          readOnly: false,
          required: true,
          collection: this.estados,
          actions: {
            action: false,
          },
        },
      },
      {
        class: 'col-lg-12 p-ai-center justify-content-center',
        title: 'Descripcion',
        field: {
          formFieldName: 'descripcion',
          typeField: 'T',
          readOnly: false,
          required: true,
          actions: null,
        },
      },
      {
        class: 'col-lg-6 p-ai-center justify-content-center',
        title: 'Elementos',
        field: {
          formFieldName: 'elementos',
          typeField: 'L',
          readOnly: false,
          required: false,
          collection: this.elements,
          actions: {
            action: false,
          },
        },
      },
      {
        class: 'col-lg-6 p-ai-center justify-content-center',
        title: 'Productos',
        field: {
          formFieldName: 'productos',
          typeField: 'L',
          readOnly: false,
          required: false,
          collection: this.products,
          actions: {
            action: false,
          },
        },
      },
      {
        class: 'col-lg-6 p-ai-center justify-content-center',
        title: 'Grupos',
        field: {
          formFieldName: 'grupos',
          typeField: 'L',
          readOnly: false,
          required: false,
          collection: this.groups,
          actions: {
            action: false,
          },
        },
      },
    ];
  }

  getDataGroups() {
    this.catalogoService.getGroups().subscribe(
      (res) => {
        this.groups = res.result;
        console.log(res.message, res.result);
        this.cargarColumnas();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getElementsByGroup(idGrupo: number) {
    this.catalogoService.getElementsByIdGroup(idGrupo).subscribe(
      (res) => {
        this.elements = res.result;
        this.formGroup.get('elementos')?.setValue(this.elements);
        console.log(res.message, res.result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProducts() {
    this.catalogoService.getProducts().subscribe(
      (res) => {
        this.products = res.result;
        console.log(res.message, res.result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createGroup(ev?: any) {
    this.formGroup.reset();
    console.log(this.formGroup.value);
    this.ref = this.dialogService.open(AgregarGrupoComponent, {
      header: ev ? 'Actualizar Parámetro' : 'Nueva Parámetro',
      width: '60%',
      data: {
        editar: ev ? true : false,
        parametro: ev,
      },
    });
    this.ref.onClose.subscribe((data) => {
      if (data) {
        this.getDataGroups();
      }
    });
  }

  clearForm() {
    this.formGroup.reset();
    this.elements = [];
  }

  validarCampos(campo: string): boolean | null {
    return (
      this.formGroup.controls[campo].errors &&
      this.formGroup.controls[campo].touched
    );
    //return false;
  }

  onChangeGrupo(event?: any) {
    console.log(event);
    var idGroup: number = event!.value;
    console.log('GRUPO RES', this.groups, idGroup);
    var itemGrupo: Group = this.groups.find((res) => res.value == idGroup)!;
    console.log('Grupo', itemGrupo);
    this.formGroup.get('grupoId')?.setValue(itemGrupo.value);
    this.formGroup.get('nombre')?.setValue(itemGrupo.name);
    this.formGroup.get('descripcion')?.setValue(itemGrupo.descripcion);
    this.formGroup
      .get('estado')
      ?.setValue(itemGrupo.estado == 1 ? true : false);
    this.formGroup.get('nombreKey')?.setValue(itemGrupo.nombreKey);
    this.getElementsByGroup(itemGrupo.value!);
  }

  updateIdELements(type: string) {
    if (type == 'group') {
      const idGroup = this.formGroup.get('grupoId')?.value;
      if (idGroup) {
        var elements: ElementsGroup[] = this.formGroup.get('elementos')?.value;
        elements.map((elem) => {
          elem.idGrupo = idGroup;
        });
      }
    }
    if (type == 'product') {
      const idGroup = this.formGroup.get('grupoId')?.value;
      if (idGroup) {
        var elements: ElementsGroup[] = this.formGroup.get('elementos')?.value;
        elements.map((elem) => {
          elem.idGrupo = idGroup;
        });
      }
    }
  }

  removeElement(element: any) {
    var elementGroup: any[] = this.formGroup.get('elementos')?.value;
    console.log(element, elementGroup);
    //remove element.idElemento in elementGroup
    var index = elementGroup.findIndex(
      (elem) =>
        elem.idElemento == element.idElemento &&
        elem.tipoElemento == element.tipoElemento
    );
    console.log('Index', index);
    if (index > -1) {
      elementGroup.splice(index, 1);
    }
    this.formGroup.get('elementos')?.setValue(elementGroup);
  }

  enviar() {
    console.log(this.formGroup.value);
    //Update Grupo (Nombre, descripcion, Estado)
    console.log('FORM GROUP', this.formGroup.value);
    var elementGroup: any[] = this.formGroup.get('elementos')?.value;
    var idGrupos: any[] = this.formGroup.get('grupos')?.value || []; // Inicializar como un arreglo vacío si es nulo
    var idProductos: any[] = this.formGroup.get('productos')?.value || []; // Inicializar como un arreglo vacío si es nulo
    console.log('Element Group', elementGroup);
    //ELEMENTOS DEL GRUPO
    elementGroup.forEach((res: any) => {
      if (res.tipoElemento == 'PRODUCTO') {
        const existe = idProductos.includes(res.idElemento);
        if (!existe) {
          idProductos.push(res.idElemento);
        }
      }
      if (res.tipoElemento == 'GRUPO') {
        const existe = idGrupos.includes(res.idElemento);
        if (!existe) {
          idGrupos.push(res.idElemento);
        }
      }
    });
    //FORM VALIDO
    if (this.formGroup.valid) {
      console.log('FORMULARIO VALIDO');
      var data: Group = {
        value: this.formGroup.get('grupoId')!.value,
        name: this.formGroup.get('nombre')!.value,
        descripcion: this.formGroup.get('descripcion')!.value,
        estado: this.formGroup.get('estado')!.value == true ? 1 : 0,
        nombreKey: this.formGroup.get('nombreKey')!.value,
        elementos: '',
      };
      console.log('ID PRODUCTOS', idProductos);
      if (idProductos != null) {
        data.elementos = `${idProductos.join(',')}`;
        this.catalogoService
          .putGrupo(data!.value!, 'ActualizarElementoProducto', data)
          .subscribe((res) => {
            this.getDataGroups();
            console.log(res);
            this.toastService.mostrarToastSuccess('Se guardo correctamente');
            this.clearForm();
          });
      }
      console.log('ID GRUPO', idGrupos);
      if (idGrupos != null) {
        data.elementos = `${idGrupos.join(',')}`;
        this.catalogoService
          .putGrupo(data.value!, 'ActualizarElementoGrupo', data)
          .subscribe((res) => {
            this.getDataGroups();
            console.log(res);
            this.toastService.mostrarToastSuccess('Se guardo correctamente');
            this.clearForm();
          });
      }
      console.log('DATA ENVIAR', data);
    }
  }
}
