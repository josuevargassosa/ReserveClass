import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AutenticacionService } from "src/app/modules/auth/services/autenticacion.service";
import {
  ReservasService,
  CreateReservaDto,
} from "../../services/reservas.service";
import { Reserva } from "../../interfaces/reserva.interface";
import { ToastService } from "src/app/core/services/toast.service";

type Rol = "Administrador" | "Docente" | "Coordinador";

@Component({
  selector: "app-reservas-page",
  templateUrl: "./reservas-page.component.html",
  styleUrls: ["./reservas-page.component.scss"],
})
export class ReservasPageComponent implements OnInit {
  loading = false;
  rows: Reserva[] = [];
  rol?: Rol;

  // Dialog “Nueva”
  showNew = false;
  form = this.fb.group({
    laboratorioId: [1, [Validators.required, Validators.min(1)]],
    usuarioId: [0, [Validators.required, Validators.min(1)]],
    asignaturaId: [1, [Validators.required, Validators.min(1)]],
    inicioISO: ["", Validators.required],
    finISO: ["", Validators.required],
  });

  constructor(
    private srv: ReservasService,
    private auth: AutenticacionService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.rol = this.auth.usuario?.rol as Rol | undefined;
    // si es Docente, autollenar su usuarioId
    const uid = this.auth.usuario?.id ?? 0;
    if (this.rol === "Docente" && uid) this.form.patchValue({ usuarioId: uid });
    this.load();
  }

  load(): void {
    this.loading = true;
    const uid = this.auth.usuario?.id ?? 0;

    this.srv.list().subscribe({
      next: (data) => {
        this.rows =
          this.rol === "Docente"
            ? data.filter((r) => r.usuarioId === uid)
            : data;
        this.loading = false;
      },
      error: (_) => {
        this.rows = [];
        this.loading = false;
      },
    });
  }

  openNew(): void {
    this.form.reset({
      laboratorioId: 1,
      usuarioId: this.rol === "Docente" ? this.auth.usuario?.id ?? 0 : 0,
      asignaturaId: 1,
      inicioISO: "",
      finISO: "",
    });
    this.showNew = true;
  }

  saveNew(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const dto: CreateReservaDto = this.form.getRawValue() as any;
    this.srv.create(dto).subscribe({
      next: (r) => {
        this.toast.mostrarToastSuccess("Reserva creada");
        this.showNew = false;
        this.load();
      },
      error: (e) => {
        const msg = e?.error?.message || "No se pudo crear la reserva";
        this.toast.mostrarToastError(msg);
      },
    });
  }

  approve(r: Reserva): void {
    this.srv.approve(r.id).subscribe({
      next: (_) => {
        this.toast.mostrarToastSuccess("Reserva aprobada");
        this.load();
      },
      error: (_) => this.toast.mostrarToastError("No se pudo aprobar"),
    });
  }

  reject(r: Reserva): void {
    this.srv.reject(r.id).subscribe({
      next: (_) => {
        this.toast.mostrarToastSuccess("Reserva rechazada");
        this.load();
      },
      error: (_) => this.toast.mostrarToastError("No se pudo rechazar"),
    });
  }
}
