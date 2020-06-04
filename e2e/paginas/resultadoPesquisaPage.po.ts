import {SimplePage} from "../compartilhado/simplePage.po";
import {by, element} from "protractor";
import {Utils} from "../compartilhado/utils";
import {Produto} from "../compartilhado/objetos/produto";

export class AmericanasResultadoPesquisaPage extends SimplePage {

    labelPaginacao = element(by.xpath(`//div[@class='card card-pagination']`));

    labelNumeroProduto = element(by.xpath(`//div[@class='form-group display-sm-inline-block']/span`));

    botaoNext = element(by.xpath(`//li//span[@aria-label='Next']`));

    botaoNextDesativado = element(by.xpath(`//li[@class='disabled']//span[@aria-label='Next']`));

    overlay = element(by.xpath(`//div[@class="loading-bar-overlay"]`));

    tabela = element(by.xpath(`//div[@data-tracker='productgrid-main']`));

    async paginacaoEstaVisivel() {

        return await this.elementoEstaPresente(this.labelPaginacao);
    }

    async validarPesquisaComProdutosDoResultado(pesquisa: string) {

        await this.esperarVisibilidadeDo(this.tabela);

        if (await this.paginacaoEstaVisivel()) {

            while (!await this.elementoEstaPresente(this.botaoNextDesativado)) {

                await this.irAteElemento(this.botaoNext);

                await this.compararNomeProdutosComPesquisa(pesquisa);

                await this.clicarElemento(this.botaoNext);

                await this.esperarPresencaDe(this.overlay);

                if (await this.overlay.isPresent()) {

                    await this.esperarInvisibilidadeDe(this.overlay);
                }
            }

            await this.compararNomeProdutosComPesquisa(pesquisa);

            return;
        }
       await this.compararNomeProdutosComPesquisa(pesquisa);
    }

    async validarResultadoPesquisa() {

        await this.esperarVisibilidadeDo(this.tabela);

        let numeroTotalDeProdutos = this.pegarNumeroTotalDeProdutosEncontrados();

        let elementosEncontradosNaPaginaDaTabela = 0;

        if (await this.paginacaoEstaVisivel()) {

            while (!await this.elementoEstaPresente(this.botaoNextDesativado)) {

                await this.irAteElemento(this.botaoNext);

                elementosEncontradosNaPaginaDaTabela += await this.pegarNumeroDeProdutosNaTabela();

                await this.clicarElemento(this.botaoNext);

                await this.esperarPresencaDe(this.overlay);

                if (await this.overlay.isPresent()) {

                    await this.esperarInvisibilidadeDe(this.overlay);
                }
            }

            elementosEncontradosNaPaginaDaTabela += await this.pegarNumeroDeProdutosNaTabela();

            Utils.assertEquals(elementosEncontradosNaPaginaDaTabela.toString(), numeroTotalDeProdutos);

            return
        }

        elementosEncontradosNaPaginaDaTabela = await this.pegarNumeroDeProdutosNaTabela();

        Utils.assertEquals(elementosEncontradosNaPaginaDaTabela.toString(), numeroTotalDeProdutos);
    }

    async pegarNumeroTotalDeProdutosEncontrados() {

        let numeroConstandoLabel = await this.pegarTexto(this.labelNumeroProduto);

        let numeroProdutos = await Utils.pegarAPrimeiraPalavraDaString(numeroConstandoLabel);

        return numeroProdutos;
    }

    async pegarNumeroDeProdutosNaTabela() {

        var produtosNaPaginaDaTabela = element.all(by.xpath(`//div[@data-tracker='productgrid-main']//h2`));


        return await produtosNaPaginaDaTabela.count();
    }


    async compararNomeProdutosComPesquisa(pesquisa: string) {

        var produtosNaPaginaDaTabela = await element.all(by.xpath(`//div[@data-tracker='productgrid-main']//h2`));

        for (const webElemento of produtosNaPaginaDaTabela) {

            Utils.assertToContain(await webElemento.getText(), pesquisa);
        }
    }


    async selecionarProdutoAleatorio() {

        var produtosNaPaginaDaTabela = await element.all(by.xpath(`//div[@data-tracker='productgrid-main']//h2`));

        var precosNaPaginaDoResultado = await element.all(by.xpath(`//div[@data-tracker='productgrid-main']//div[@class='PriceWrapper-bwhjk3-13 IjiIU ViewUI-sc-1ijittn-6 iXIDWU']/span`));

        let index = Utils.gerarnumeroaleatorio(0, produtosNaPaginaDaTabela.length);

        let nomeProduto: string = await this.pegarTexto(produtosNaPaginaDaTabela[index]);

        let precoProduto: string = await this.pegarTexto((precosNaPaginaDoResultado[index]));

        await this.clicarElemento(produtosNaPaginaDaTabela[index]);

        return new Produto(nomeProduto, precoProduto);
    }
}