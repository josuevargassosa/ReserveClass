import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AutenticacionService } from "src/app/modules/auth/services/autenticacion.service";
import {
  ReservasService,
  CreateReservaDto,
  CatalogoItem,
} from "../../services/reservas.service";
import { Reserva } from "../../interfaces/reserva.interface";
import { ToastService } from "src/app/core/services/toast.service";

import { forkJoin } from "rxjs";

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

  labs: CatalogoItem[] = [];
  asigs: CatalogoItem[] = [];
  private labMap = new Map<number, string>();
  private asigMap = new Map<number, string>();

  dataUser: any | null = null;

  approvingId: number | null = null;
  rejectingId: number | null = null;

  // Dialog “Nueva”
  showNew = false;
  form = this.fb.group({
    laboratorioId: [null as number | null, [Validators.required]],
    usuarioId: [0, [Validators.required]],
    asignaturaId: [null as number | null, [Validators.required]],
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

    this.dataUser = this.auth.usuario;
    const uid = this.dataUser?.id ?? 0;
    this.form.patchValue({ usuarioId: uid });

    this.loading = true;

    this.srv.laboratorios().subscribe(async (res) => {
      this.labs = res.result;
      this.labMap = new Map(res.result.map((l: any) => [l.id, l.nombre]));
    });

    this.srv.asignaturas().subscribe(async (res) => {
      this.asigs = res.result;
      this.labMap = new Map(res.result.map((l: any) => [l.id, l.nombre]));
    });

    this.load();
  }

  load(): void {
    this.loading = true;
    //const uid = this.auth.usuario?.id ?? 0;

    this.srv.list().subscribe({
      next: (data) => {
        this.rows =
          this.rol === "Docente"
            ? data.filter((r) => r.usuarioId === this.dataUser?.id)
            : data;
        this.loading = false;
        console.log(this.rows);
      },
      error: (_) => {
        this.rows = [];
        this.loading = false;
      },
    });
  }

  labName(id: number) {
    return this.labMap.get(id) ?? id;
  }
  asigName(id: number) {
    return this.asigMap.get(id) ?? id;
  }

  openNew(): void {
    const firstLab = this.labs[0]?.id ?? null;
    const firstAsig = this.asigs[0]?.id ?? null;
    //const uid = this.rol === "Docente" ? this.auth.usuario?.id ?? 0 : 0;

    this.form.reset({
      laboratorioId: firstLab,
      usuarioId: this.dataUser?.id ?? null, // si es admin/coordinador, tú decides si permitir elegir usuario luego
      asignaturaId: firstAsig,
      inicioISO: "",
      finISO: "",
    });
    this.showNew = true;
  }

  isHorarioValido(): boolean {
    const i = this.form.value.inicioISO;
    const f = this.form.value.finISO;
    if (!i || !f) return false;
    return new Date(i) < new Date(f);
  }

  saveNew(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || !this.isHorarioValido()) return;

    const dto: CreateReservaDto = this.form.getRawValue() as any;
    this.srv.create(dto).subscribe({
      next: (_) => {
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

  cancelar() {
    this.showNew = false;
    // this.form.reset();
  }

  approve(r: Reserva): void {
    if (this.approvingId) return;
    this.approvingId = r.id;

    this.srv.approve(r.id).subscribe({
      next: (_) => {
        this.toast.mostrarToastSuccess("Reserva aprobada");

        this.load();

        this.approvingId = null;
      },
      error: (e) => {
        console.log(e);
        this.toast.mostrarToastError(e?.error?.message || "No se pudo aprobar");
        this.approvingId = null;
      },
    });
  }

  reject(r: Reserva): void {
    if (this.rejectingId) return;
    this.rejectingId = r.id;

    this.srv.reject(r.id).subscribe({
      next: (_) => {
        this.toast.mostrarToastSuccess("Reserva rechazada");

        this.load();
        this.rejectingId = null;
      },
      error: (e) => {
        console.log(e);
        this.toast.mostrarToastError(
          e?.error?.message || "No se pudo rechazar"
        );
        this.rejectingId = null;
      },
    });
  }
}
