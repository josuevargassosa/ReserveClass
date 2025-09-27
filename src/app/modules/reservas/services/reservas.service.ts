import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Reserva } from "../interfaces/reserva.interface";
import { environment } from "src/environments/environment";

export interface CreateReservaDto {
  laboratorioId: number;
  usuarioId: number;
  asignaturaId: number;
  inicioISO: string; // 2025-09-22T10:00
  finISO: string; // 2025-09-22T12:00
}

export interface CatalogoItem {
  id: number;
  nombre: string;
}

@Injectable({ providedIn: "root" })
export class ReservasService {
  private readonly base = `${environment.apiBaseUrl}${environment.endpoints.reservas}`;
  constructor(private http: HttpClient) {}

  list(): Observable<Reserva[]> {
    return this.http
      .get<any>(this.base)
      .pipe(map((r) => (Array.isArray(r) ? r : r?.result ?? [])));
  }

  laboratorios(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/monitor/laboratorios`);
  }

  asignaturas(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/monitor/asignaturas`);
  }

  create(dto: CreateReservaDto): Observable<any> {
    return this.http.post<any>(this.base, dto);
  }

  // ✅ aprobar
  approve(id: number) {
    const url = `${
      environment.apiBaseUrl
    }/monitor/reservas/${encodeURIComponent(id)}/aprobar`;
    console.log("PATCH ->", url); // Debe terminar en .../reservas/1/aprobar
    return this.http.patch<any>(url, {});
  }

  // ✅ rechazar (por si acaso)
  reject(id: number) {
    const url = `${
      environment.apiBaseUrl
    }/monitor/reservas/${encodeURIComponent(id)}/rechazar`;
    return this.http.patch<any>(url, {});
  }
}
