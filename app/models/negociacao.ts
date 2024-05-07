import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> {
    constructor(
        private _data: Date, 
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

    // Funções estáticas são funções que não necessitam da instância da classe para serem utilizados
    public static criaNegociacao(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        const exp: RegExp = /-/g;

        const data: Date = new Date(dataString.replace(exp, ','));
        const quantidade: number = parseInt(quantidadeString);
        const valor: number = parseFloat(valorString);

        return new Negociacao(
            data,
            quantidade,
            valor
        );
    }

    get data(): Date {
        const data = new Date(this._data.getTime());

        return data;
    }

    get volume(): Number {
        return this.quantidade * this.valor;
    }

    public imprimeTexto(): string {
        return `
            Data: ${this.data},
            Quantidade: ${this.quantidade},
            Valor: ${this.valor}
        `;
    }

    public verificaRepeticao(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate() 
            && this.data.getMonth() == negociacao.data.getMonth() 
            && this.data.getFullYear() == negociacao.data.getFullYear();
    }
}