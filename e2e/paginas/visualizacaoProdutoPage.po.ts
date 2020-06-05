import { SimplePage } from "../compartilhado/simplePage.po";
import { by, element } from "protractor";
import { Utils } from "../compartilhado/utils";

export class VisualizacaoProdutoPagePo extends SimplePage {
    nomeProduto = element(by.id("product-name-default"));

    botaoComprar = element(by.id("btn-buy"));

    labelPreco = element(
        by.xpath(`//span[@class='price__SalesPrice-ej7lo8-2 kjGSBk TextUI-sc-12tokcy-0 bLZSPZ']`)
    );

    botaoSimContinuarCompra = element(
        by.xpath(`//span[contains(text(),'Sim, continuar')]`)
    );

    async validarNomeProduto(produto: string) {
        Utils.assertEquals(
            produto,
            Utils.paraMinusculo(await this.pegarTexto(this.nomeProduto))
        );
    }
    async validarValorProduto(preco: string) {
        Utils.assertEquals(preco, await this.pegarTexto(this.labelPreco));
    }

    async adicionarAoCarrinho() {
        let valorCompra: string = await this.pegarTexto(this.labelPreco);

        await this.clicarElemento(this.botaoComprar);

        if (await this.botaoSimContinuarCompra.isPresent()) {
            this.clicarElemento(this.botaoSimContinuarCompra);
        }

        return valorCompra;
    }
}
