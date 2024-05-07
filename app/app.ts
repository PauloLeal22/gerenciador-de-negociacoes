import { NegociacaoController } from "./controllers/negociacao-controller.js";
import { NegociacoesView } from "./views/negociacoes-view.js";

const controller: NegociacaoController = new NegociacaoController();

const form = document.querySelector('.form');

if(form) {
    form.addEventListener('submit', (event: Event): void => {
        event.preventDefault();
    
        controller.adiciona();
    });
} else {
    throw Error('Não foi possível inicializar a aplicação. verifique se o form existe.');
}

const botaoImportar = document.querySelector('#botaoImportar');

if(botaoImportar) {
    botaoImportar.addEventListener('click', () => {
        controller.importaDados();
    });
} else {
    throw Error('Botão de importar não foi encontrado.');
}

