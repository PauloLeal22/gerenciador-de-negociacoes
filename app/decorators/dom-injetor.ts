export function domInjetor(seletor: string) {
    return function(target: any, propertyKey: string) {
        let elemento: HTMLInputElement | null = null;

        const getter = function () {
            if(!elemento) {
                // o "as" garante que o conteúdo da variável seja o tipo que você passar
                elemento = document.querySelector(seletor) as HTMLInputElement;
            }

            return elemento;
        }

        Object.defineProperty(target, propertyKey, { get: getter });
    }
}