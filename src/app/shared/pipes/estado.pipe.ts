import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: String): string {
    return value == 'A' ? 'Activo' : 'Inactivo';
  }

}
