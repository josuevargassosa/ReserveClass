export interface Reserva {
  id: number;
  laboratorioId: number;
  usuarioId: number;
  asignaturaId: number;
  fecha: string; // 'YYYY-MM-DD'
  horaInicio: string; // 'HH:mm:ss'
  horaFin: string; // 'HH:mm:ss'
  estado: "Pendiente" | "Aprobada" | "Rechazada";
  // opcional si tu backend lo devuelve
  inicioISO?: string;
  finISO?: string;
}
