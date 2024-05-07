import { domInjetor } from "../decorators/dom-injetor.js";
import { inspecionar } from "../decorators/inspeciona.js";
import { logarTempoExecucao } from "../decorators/log-tempo-execucao.js";
import { DiasSemana } from "../enums/dias-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    @domInjetor('#data')
    private inputData: HTMLInputElement;

    @domInjetor('#quantidade')
    private inputQuantidade: HTMLInputElement;

    @domInjetor('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes: Negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();

    constructor() {
        this.negociacoesView.atualiza(this.negociacoes);
    }

    @inspecionar
    @logarTempoExecucao()
    public adiciona(): void {
        const negociacao: Negociacao = Negociacao.criaNegociacao(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );

        if (!this.verificaDiaUtil(negociacao.data)) {
            this.mensagemView.atualiza('São permitidas negociações apenas em dias úteis.');

            return;
        }

        this.negociacoes.adiciona(negociacao);

        imprimir(negociacao, this.negociacoes);

        this.atualizaView();

        this.limparFormulario();
    }

    importaDados(): void {
        this.negociacoesService.importarNegociacoes()
            .then(negociacoes => {
                return negociacoes.filter(negociacao => {
                    return !this.negociacoes.lista().some(negociacao => negociacao.verificaRepeticao(negociacao));
                });
            })
            .then((negociacoes => {
                negociacoes.forEach(negociacao => {
                    this.negociacoes.adiciona(negociacao);
                });

                this.negociacoesView.atualiza(this.negociacoes);
            }));
    };

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';

        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.atualiza(this.negociacoes);

        this.mensagemView.atualiza('Negociação adicionada com sucesso.');
    }

    private verificaDiaUtil(data: Date): boolean {
        return data.getDay() > DiasSemana.domingo && data.getDay() < DiasSemana.sabado;
    }
}