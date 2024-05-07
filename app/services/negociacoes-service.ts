import { NegociacaoImportada } from "../interfaces/negociacao-importada.js";
import { Negociacao } from "../models/negociacao.js";

export class NegociacoesService {
    public importarNegociacoes(): Promise<Array<Negociacao>> {
        return fetch('http://localhost:8080/dados')
        .then(res => { 
            return res.json(); 
        })
        .then((dados: Array<NegociacaoImportada>) => {
            return dados.map(dado => {
                return new Negociacao(new Date(), dado.vezes, dado.montante);
            });
        })
    }
}