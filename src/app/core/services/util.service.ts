import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UtilService {
  url: string = `${environment.apiBaseUrl}/util`;

  constructor(private http: HttpClient) {}

  cifrarTexto(texto: string): Observable<string> {
    return this.http.get<string>(`${this.url}/cifrar-texto/${texto}`);
  }
}
