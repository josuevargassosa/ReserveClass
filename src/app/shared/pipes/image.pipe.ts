import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "src/environments/environment";

@Pipe({
  name: "image",
})
export class ImagePipe implements PipeTransform {
  urlImagen = "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png";

  transform(value: any, ...array: any[]): string {
    if (!value) {
      return this.urlImagen;
    }

    if (value.url) {
      this.urlImagen = value.url;
    } else if (value.adjunto) {
      this.urlImagen = value.adjunto;
    } else if (value.imagenId) {
      //this.urlImagen = `${environment.baseUrlArchivos}/imagen/${array[0]}/${value.idImagen ? value.idImagen : value.imagenId}`;
    } else {
      this.urlImagen = this.urlImagen; // default image url if none is found.
    }

    return this.urlImagen;
  }
}
