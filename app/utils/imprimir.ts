import { Imprimivel } from "./imprimivel.js";

export function imprimir(...objetos: Array<Imprimivel>): void {
    objetos.forEach(objeto => {
        console.log(objeto.imprimeTexto());
    });
}