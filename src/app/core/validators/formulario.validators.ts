import { AbstractControl } from "@angular/forms";

export class FormularioValidators {

    static validarUrl(control: AbstractControl) {
        if (control && control.value != null && control.value != "") {
            var patt = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm);
            var res = patt.test(control.value);

            if (!res) {
                return { validatorUrl: true };
            }
        }

        return null;
    }

    static validarCedula(control: AbstractControl) {
        if (control && control.value != null && control.value != "" && control.value.length == 10) {

            let j: number = 0;
            let temp: number = 0;
            let resultado: number = 0;
            let coeficientes: String = "212121212";
            let cedula: string = control.value;

            for (let i = 0; i < cedula.length - 1; i++) {
                j = parseInt(cedula.substring(i, i + 1));
                temp = j * parseInt(coeficientes.substring(i, i + 1));
                if (temp >= 10) {
                    temp = temp - 9;
                }
                resultado = resultado + temp;
            }
            temp = resultado + (resultado % 10);
            resultado = 10 - (temp - resultado);
            if (resultado == 10) {
                resultado = 0;
            }
            j = parseInt(cedula.substring(9));
            if (resultado == j) {
                //alert("La cedula es válida");
                return null
            }
            else {
                //alert("La cedula es inválida");
                return { validatorCedula: true };
            }

        }

        return null;
    }

    static validarCelular(control: AbstractControl) {
        if (control && control.value != null && control.value != "" && control.value.length == 10) {
            var patt = new RegExp(/^09[0-9]{8}$/gm);
            var res = patt.test(control.value);

            if (!res) {
                return { validatorCelular: true };
            }
        }

        return null;
    }
}