import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEstadisticaGeneral } from '../interfaces/estadistica-general.interface';

@Injectable({
  providedIn: 'root',
})
export class EstadisticaService {
  url = `${environment.baseUrl}/estadistica`;

  constructor(private http: HttpClient) {}

  consultarEstadisticaGeneral(
    fechaDesde?: string,
    fechaHasta?: string
  ): Observable<IEstadisticaGeneral[]> {
    let body = {
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
    };
    return this.http
      .post<IEstadisticaGeneral[]>(
        `${this.url}/facilito-movil-usuario-fecha`,
        body
      )
      .pipe(
        map((res: any) => {
          if (res.codigoError === 0) {
            return res.data;
          } else {
            throw new Error(res.mensajeSistema);
          }
        })
      );
  }
}
