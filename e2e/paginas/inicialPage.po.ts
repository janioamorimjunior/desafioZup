import {SimplePage} from "../compartilhado/simplePage.po";
import {by, element} from "protractor";

export class AmericanasInicialPage extends SimplePage {

    campoBarraPesquisar = element(by.id('h_search-input'));

    botaoPesquisar = element(by.id('h_search-btn'));

    botaoCarrinho = element(by.xpath(`//a[@class='crt-link']`));

    async pesquisar(pesquisa: string) {

        await this.inserirDado(this.campoBarraPesquisar, pesquisa);

        await this.clicarElemento(this.botaoPesquisar);
    }

    async irParaCarrinho() {

        await this.clicarElemento(this.botaoCarrinho);
    }
}