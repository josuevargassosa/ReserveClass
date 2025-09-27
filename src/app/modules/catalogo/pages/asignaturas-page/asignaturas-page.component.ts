import { Component, OnInit } from "@angular/core";
import { CatalogoService } from "../../services/catalogo.service";

@Component({
  selector: "app-asignaturas-page",
  templateUrl: "./asignaturas-page.component.html",
})
export class AsignaturasPageComponent implements OnInit {
  loading = false;
  rows: Array<{ id: number; nombre: string; carreraNombre: string }> = [];

  constructor(private cat: CatalogoService) {}

  ngOnInit(): void {
    this.loading = true;
    this.cat.getAsignaturasConCarrera().subscribe({
      next: (data) => {
        this.rows = data;
        this.loading = false;
      },
      error: () => {
        this.rows = [];
        this.loading = false;
      },
    });
  }
}
