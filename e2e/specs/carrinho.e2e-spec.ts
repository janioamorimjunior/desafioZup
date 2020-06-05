import { AmericanasInicialPage } from "../paginas/inicialPage.po";
import { AmericanasResultadoPesquisaPage } from "../paginas/resultadoPesquisaPage.po";
import { VisualizacaoProdutoPagePo } from "../paginas/visualizacaoProdutoPage.po";
import { CarrinhoPagePo } from "../paginas/carrinhoPage.po";
import { Produto } from "../compartilhado/objetos/produto";

describe("Carrinho", async () => {
    const inicialPage: AmericanasInicialPage = new AmericanasInicialPage();

    const resultadoPage: AmericanasResultadoPesquisaPage = new AmericanasResultadoPesquisaPage();

    const visualizacaoProdutoPage: VisualizacaoProdutoPagePo = new VisualizacaoProdutoPagePo();

    const carrinhoPage: CarrinhoPagePo = new CarrinhoPagePo();

    beforeEach(async () => {
        inicialPage.navegarAte("https://www.americanas.com.br/");
    });

    it("Validar carrinho vazio no primeiro acesso da aplicação", async () => {
        await inicialPage.irParaCarrinho();

        await carrinhoPage.carrinhoEstaVazioTelaInicial();
    });

    it("Adicionar um produto no carrinho e validar o preço e o produto", async () => {
        await inicialPage.pesquisar("gundam");

        let produto: Produto = await resultadoPage.selecionarProdutoAleatorio();

        await visualizacaoProdutoPage.adicionarAoCarrinho();

        await carrinhoPage.produtoEstaNoCarrinho(produto.nome, produto.preco);
    });

    it("Esvaziar carrinho e validar carrinho vazio", async () => {
        await inicialPage.pesquisar("gundam");

        await resultadoPage.selecionarProdutoAleatorio();

        await visualizacaoProdutoPage.adicionarAoCarrinho();

        await carrinhoPage.esvaziarCarrinho();

        await carrinhoPage.carrinhoEstaVazioNaCarrinhoPagina();
    });
});
