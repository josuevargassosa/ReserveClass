export interface IUsuarioSesion {
  id: number;
  nombre: string;
  email: string;
  rol: "Administrador" | "Docente" | "Coordinador";
}
