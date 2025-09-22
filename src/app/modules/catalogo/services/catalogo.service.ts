import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IResponseGeneral } from "src/app/core/interfaces/response-general.interface";
import { environment } from "src/environments/environment";
import { OperationResult } from "src/app/shared/interfaces/OperationResult.interface";
import { Group } from "../interfaces/group.interface";
import { Products } from "../interfaces/products.interface";

@Injectable({
  providedIn: "root",
})
export class CatalogoService {
  url: string = `${environment.apiBaseUrl}/catalogo`;

  constructor(private http: HttpClient) {}

  //PRODUCTO Y GRUPO
  getGroups(): Observable<OperationResult> {
    return this.http.get<OperationResult>(`${this.url}/admin/grupo`);
  }

  getElementsByIdGroup(idGrupo: number): Observable<OperationResult> {
    return this.http.get<OperationResult>(
      `${this.url}/admin/grupo/elementos/${idGrupo}`
    );
  }

  putGrupo(
    idGrupo: number,
    tipo: string,
    data: Group
  ): Observable<OperationResult> {
    return this.http.put<OperationResult>(
      `${this.url}/admin/grupo/${idGrupo}/${tipo}`,
      data
    );
  }

  postGrupo(data: Group): Observable<OperationResult> {
    return this.http.post<OperationResult>(`${this.url}/admin/grupo`, data);
  }

  getProducts(): Observable<OperationResult> {
    return this.http.get<OperationResult>(`${this.url}/admin/productos`);
  }

  putProduct(id: number, data: Products): Observable<OperationResult> {
    return this.http.put<OperationResult>(
      `${this.url}/admin/producto/${id}`,
      data
    );
  }
}
