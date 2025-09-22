import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descifraTextoArray'
})
export class DescifraTextoArrayPipe implements PipeTransform {

  transform(value: string, array: any[]): string {
    if(!array) {
      return "";
    }

    let resultado = array.find(x => x.value === value);
    if(!resultado){
      return "";
    }
    return resultado.label;
  }

}
