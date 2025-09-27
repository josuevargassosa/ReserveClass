import { Component, OnInit } from "@angular/core";
import { CatalogoService, Laboratorio } from "../../services/catalogo.service";

@Component({
  selector: "app-laboratorios-page",
  templateUrl: "./laboratorios-page.component.html",
})
export class LaboratoriosPageComponent implements OnInit {
  loading = false;
  rows: Laboratorio[] = [];

  constructor(private cat: CatalogoService) {}

  ngOnInit(): void {
    this.loading = true;
    this.cat.getLaboratorios().subscribe({
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
