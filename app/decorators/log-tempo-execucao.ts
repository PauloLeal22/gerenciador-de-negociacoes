export function logarTempoExecucao(exibirSegundos: boolean = false) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: Array<any>): void {
            let divisor = 1;
            let unidade = 'milisegundos';

            if(exibirSegundos) {
                divisor = 1000;
                unidade = 'segundos'
            }

            const t1 = performance.now();

            const retorno = metodoOriginal.apply(this, args);

            const t2 = performance.now();
            console.log(`${propertyKey}(), tempo de execução: ${(t2 - t1) / divisor} ${unidade}.`);

            return retorno;
        }

        return descriptor;
    }
}