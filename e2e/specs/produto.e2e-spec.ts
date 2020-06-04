import {AmericanasInicialPage} from "../paginas/inicialPage.po";
import {AmericanasResultadoPesquisaPage} from "../paginas/resultadoPesquisaPage.po";
import {VisualizacaoProdutoPagePo} from "../paginas/visualizacaoProdutoPage.po";
import {Produto} from "../compartilhado/objetos/produto";


describe('Produto', async () => {

    const inicialPage: AmericanasInicialPage = new AmericanasInicialPage();

    const resultadoPage: AmericanasResultadoPesquisaPage = new AmericanasResultadoPesquisaPage();

    const visualizacaoProdutoPage: VisualizacaoProdutoPagePo = new VisualizacaoProdutoPagePo();

    beforeEach(async() => {

        inicialPage.navegarAte('https://www.americanas.com.br/');
    });

    it('Validar o nome do produto escolhido aleatoriamente', async () => {

        await inicialPage.pesquisar('gundam');

        let produto: Produto = await resultadoPage.selecionarProdutoAleatorio();

        await visualizacaoProdutoPage.validarNomeProduto(produto.nome);
    });

    it('Validar o preço do produto escolhido aleatoriamente', async () => {

        await inicialPage.pesquisar('gundam');

        let produto: Produto = await resultadoPage.selecionarProdutoAleatorio();

        await visualizacaoProdutoPage.validarValorProduto(produto.preco);
    });
});