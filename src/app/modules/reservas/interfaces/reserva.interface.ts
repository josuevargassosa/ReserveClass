export interface Reserva {
  id: number;
  laboratorioId: number;
  usuarioId: number;
  asignaturaId: number;
  fechaDisplay?: string;
  fecha: string; // 'YYYY-MM-DD'
  horaInicio: string; // 'HH:mm:ss'
  horaFin: string; // 'HH:mm:ss'
  estado: "Pendiente" | "Aprobada" | "Rechazada";
  inicioISO?: string;
  finISO?: string;

  laboratorioNombre?: string;
  usuarioNombre?: string;
  asignaturaNombre?: string;
}
