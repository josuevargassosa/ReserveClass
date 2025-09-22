import { Component, OnInit, signal } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';
import Constantes from 'src/app/core/utils/constantes';
import { collection } from 'src/app/shared/interfaces/collection.interface';
import { ITipoColumna } from 'src/app/core/interfaces/tipo-columna.interface';

@Component({
  selector: 'app-producto-page',
  templateUrl: './producto-page.component.html',
  styleUrls: ['./producto-page.component.scss'],
})
export class ProductoPageComponent implements OnInit {
  //public products = signal<collection[]>([]);
  products: collection[] = [];
  estados = Constantes.Estados;

  nombre: string = '';
  cols: ITipoColumna[] = [];

  constructor(private catalogoService: CatalogoService) {}

  async ngOnInit() {
    await this.cargarProductos();
    this.cargarColumnas();
  }

  cargarProductos() {
    this.catalogoService.getProducts().subscribe(
      (res) => {
        this.products = res.result;
        console.log('Productos: ', this.products);
        this.cargarColumnas();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cargarColumnas() {
    console.log('Cargar Columnas');
    this.cols = [
      {
        class: 'col-lg-12 p-ai-center justify-content-center',
        title: 'Producto',
        field: {
          formFieldName: 'producto',
          typeField: 'S',
          readOnly: false,
          required: true,
          collection: this.products,
          actions: {
            action: true,
          },
        },
      },
      {
        class: 'col-lg-5 p-ai-center justify-content-center',
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
        class: 'col-lg-5 p-ai-center justify-content-center',
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
        class: 'col-lg-2 p-ai-center justify-content-center',
        title: 'Estado',
        field: {
          formFieldName: 'estado',
          typeField: 'S',
          collection: this.estados,
          readOnly: false,
          required: true,
          actions: {
            action: false,
          },
        },
      },
      {
        class: 'col-lg-6 p-ai-center justify-content-center',
        title: 'Imagen',
        field: {
          formFieldName: 'nombreKey',
          typeField: 'T',
          readOnly: true,
          actions: null,
        },
      },
    ];
  }

  confirmForm() {}
}
