import { SimplePage } from "../compartilhado/simplePage.po";
import { by, element } from "protractor";
import { Utils } from "../compartilhado/utils";

export class CarrinhoPagePo extends SimplePage {
    xpathProdutos = `//h2[@class='basket-productTitle']/a`;

    xpathPreco = `//span[@class='basket-productPrice']`;

    xpathBotaoRemoverProduto = `//span[@class='basket-productRemoveAct link-primary --desktop']`;

    async carrinhoEstaVazioTelaInicial() {
        Utils.assertTrue(
            await this.elementoEstaPresente(
                element(by.xpath(`//span[@class='h_tooltip-title empty-crt']`))
            )
        );
    }

    async carrinhoEstaVazioNaCarrinhoPagina() {
        this.esperarPresencaDe(
            element(by.xpath(`//h2[contains(text(),'Sua cesta está vazia')]`))
        );

        Utils.assertTrue(
            await this.elementoEstaPresente(
                element(by.xpath(`//h2[contains(text(),'Sua cesta está vazia')]`))
            )
        );
    }

    async esvaziarCarrinho() {
        await this.esperarElementoFicarClicavel(
            element.all(by.xpath(this.xpathProdutos)).first()
        );

        const botoesRemoverProduto = await element.all(
            by.xpath(this.xpathBotaoRemoverProduto)
        );

        for (const botao of botoesRemoverProduto) {
            await this.clicarElemento(botao);
        }
    }
    async produtoEstaNoCarrinho(nomeProduto: string, precoProduto: string) {
        await this.esperarElementoFicarClicavel(
            element.all(by.xpath(this.xpathProdutos)).first()
        );

        const produtos = await element.all(by.xpath(this.xpathProdutos));

        const precos = await element.all(by.xpath(this.xpathPreco));

        Utils.assertTrue(
            produtos.some(
                async (produto) =>
                    Utils.paraMinusculo(await this.pegarAtributo(produto, "title")) ===
                    nomeProduto
            )
        );

        Utils.assertTrue(
            precos.some(
                async (preco) =>
                    Utils.paraMinusculo(await this.pegarTexto(preco)) === precoProduto
            )
        );
    }
}
