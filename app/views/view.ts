export abstract class View<T> {
    protected elemento: HTMLElement;

    constructor(seletor: string) {
        const elemento = document.querySelector(seletor);

        if(elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM.`);
        }
    }

    // função abstrata é uma função que a classe pai não sabe como será implementada na classe filha
    protected abstract template(model: T): string;

    public atualiza(model: T): void {
        let template = this.template(model);

        this.elemento.innerHTML = template;
    }
}