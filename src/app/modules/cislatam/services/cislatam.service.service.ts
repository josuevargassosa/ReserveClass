import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponse, Comprobante } from "../interfaces/comprobante.interface";

@Injectable({
  providedIn: "root",
})
export class CislatamService {
  url: string = `${environment.apiBaseUrl}/comprobantes`;
  baseBlobStorageUrl: string = "";

  constructor(private http: HttpClient) {}

  // Obtener comprobantes por periodo
  getComprobantesPorPeriodo(periodo: string): Observable<Comprobante[]> {
    return this.http.get<Comprobante[]>(
      `${this.url}/periodo?periodo=${periodo}`
    );
  }

  // Cargar comprobantes
  cargarComprobantes(): Observable<Comprobante[]> {
    return this.http.get<Comprobante[]>(`${this.url}/all`);
  }

  // Descargar todos los comprobantes
  descargarTodosLosComprobantes(): Observable<any> {
    return this.http.get(`${this.url}/descargar-todos`, {
      responseType: "blob",
    });
  }

  // Descargar un solo comprobante por ID
  descargarComprobante(url: string): Observable<any> {
    return this.http.get(`${this.url}/descargar/${url}`, {
      responseType: "blob",
    });
  }

  // Aceptar comprobante
  aceptarComprobante(
    id: number,
    usuario: string
  ): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(`${this.url}/aprobar`, {
      id: id,
      usuarioModificacion: usuario,
    });
  }

  // Rechazar comprobante
  rechazarComprobante(
    id: number,
    motivo: string,
    usuarioModificacion: string
  ): Observable<ApiResponse<boolean>> {
    console.log(id, motivo);
    return this.http.post<ApiResponse<boolean>>(`${this.url}/rechazar`, {
      id: id,
      observacion: motivo,
      usuarioModificacion: usuarioModificacion,
    });
  }
}
