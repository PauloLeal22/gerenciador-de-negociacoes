// decorator é uma função que decora a função sucessora podendo adicionar uma nova lógica antes e depois do método original

export function decorator(parametro: any) {
    /*
        target: em método static é uma função constructor, mas em método não static é o prototype
        propertyKey: nome do método decorado
        descriptor: o próprio método
    */

    /* 
        caso o decorator não possua nenhum parâmetro, pode exportar diretamente a função abaixo
        ex: export function decorator (target: any, propertyKey: string, descriptor: PropertyDescriptor) {}
    */
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        // guarda o método original
        const metodoOriginal = descriptor.value;

        // sobrescreve o método original
        descriptor.value = function(...args: Array<any>) {

            // lógica antes do método original...

            // executa o método original
            const retorno = metodoOriginal.apply(this, args);

            // lógica depois do método original...

            return retorno;
        }

        // retorna o novo método
        return descriptor;
    }
}