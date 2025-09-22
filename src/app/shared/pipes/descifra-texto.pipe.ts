import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descifraTexto'
})
export class DescifraTextoPipe implements PipeTransform {

  transform(value: string): string {
    let resultado = "";
    switch (value) {
      case 'S':
        resultado = "Si";
        break;
      case 'N':
        resultado = "No";
        break;
      default:
        resultado = "";
    }

    return resultado;
  }

}
