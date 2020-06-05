import { AmericanasInicialPage } from "../paginas/inicialPage.po";
import { AmericanasResultadoPesquisaPage } from "../paginas/resultadoPesquisaPage.po";

describe("Pesquisas", async () => {
    const inicialPage: AmericanasInicialPage = new AmericanasInicialPage();

    const resultadoPage: AmericanasResultadoPesquisaPage = new AmericanasResultadoPesquisaPage();

    beforeEach(async () => {
        inicialPage.navegarAte("https://www.americanas.com.br/");
    });

    fit("Validar numero total de produtos com o resultado contendo paginação", async () => {
        await inicialPage.pesquisar("gundam");

        await resultadoPage.validarResultadoPesquisa();
    });

    it("Validar numero total de produtos com o resultado sem paginação", async () => {
        await inicialPage.pesquisar("abobrinhas");

        await resultadoPage.validarResultadoPesquisa();
    });

    it("Validar se o nome dos produtos contem o que foi informado na pesquisa sem paginação", async () => {
        await inicialPage.pesquisar("abobrinhas");

        await resultadoPage.validarPesquisaComProdutosDoResultado("abobrinhas");
    });

    it("Validar se o nome dos produtos contem o que foi informado na pesquisa com paginação", async () => {
        await inicialPage.pesquisar("gundam");

        await resultadoPage.validarPesquisaComProdutosDoResultado("gundam");
    });
});
