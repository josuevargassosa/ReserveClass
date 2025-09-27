import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, map, Observable } from "rxjs";
import { IResponseGeneral } from "src/app/core/interfaces/response-general.interface";
import { environment } from "src/environments/environment";
import { OperationResult } from "src/app/shared/interfaces/OperationResult.interface";
import { Group } from "../interfaces/group.interface";
import { Products } from "../interfaces/products.interface";

export interface Laboratorio {
  id: number;
  nombre: string;
  ubicacion: string;
}

export interface Asignatura {
  id: number;
  nombre: string;
  carreraId: number;
}

export interface Carrera {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: "root",
})
export class CatalogoService {
  url: string = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getLaboratorios(): Observable<Laboratorio[]> {
    return this.http.get<any>(`${this.url}/monitor/laboratorios`).pipe(
      map((r) => r.result as Laboratorio[]) // según tu ApiResponseDto
    );
  }

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http
      .get<any>(`${this.url}/monitor/asignaturas`)
      .pipe(map((r) => r.result as Asignatura[]));
  }

  getCarreras(): Observable<Carrera[]> {
    return this.http
      .get<any>(`${this.url}/monitor/carreras`)
      .pipe(map((r) => r.result as Carrera[]));
  }

  // Helper: asignaturas con el nombre de la carrera
  getAsignaturasConCarrera(): Observable<
    Array<Asignatura & { carreraNombre: string }>
  > {
    return forkJoin({
      asigs: this.getAsignaturas(),
      cars: this.getCarreras(),
    }).pipe(
      map(({ asigs, cars }) => {
        const mapa = new Map(cars.map((c) => [c.id, c.nombre]));
        return asigs.map((a) => ({
          ...a,
          carreraNombre: mapa.get(a.carreraId) ?? "",
        }));
      })
    );
  }

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
