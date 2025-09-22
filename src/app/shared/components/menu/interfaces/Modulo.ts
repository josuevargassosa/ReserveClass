import { SubModulo } from "./SubModulo";

export interface Modulo {
    ModuloId: number;
    ModuloNombre: string;
    ModuloIcono: string;
    ModuloOrden: number;
    SubModulos: SubModulo[];
}