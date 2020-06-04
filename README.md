# desafioZup

## Descrição

Este projeto trata se de uma forma de apresentar o meu trabalho para a empresa zup, foi pedido para escolher um grande portal de comércio online e automatizar testes nele, foi escolhida a Americanas, com isso esse projeto foi elaborado com o auxílio do **Protractor** (framework end-2-end), responsável pela automação, e o **Allure Report**, cujo papel é gerar realtorio sobre a automação.

## Iniciando

Para executar o projeto, será necessário instalar os seguintes programas:
- [npm: Necessário para para baixar o protractor](https://www.npmjs.com/get-npm)
- [protractor: necessário para executar o projeto](https://www.protractortest.org/#/)

Para conseguir usar o **protractor** é necessário poussuir o **npm (Gerenciador de Pacotes do Node)** instalado na maquina, para executar o comando abaixo:
```shell
npm install -g protractor
```
Fora o **protractor**, é instalado junto nesse comando o **webdriver-manager**, que nada mais é do que um gerenciador de instâncias 
do selenium server e para baixar ou atualizar os drivers do selenium é preciso executar a seguinte linha de comando:
```shell
webdriver-manager update
```

## Desenvolvimento
Para executar a automação primeiramente tem que se clonar o projeto em um diretório de sua preferência: 

```shell
cd "diretorio de sua preferencia"
git clone https://github.com/janioamorimjunior/desafioZup.git
```

## Construção
depois de clonado, é preciso instalar as dependências do projeto, usando o comando seguinte:

```shell
npm install
```
Esse comando vai baixar todas as dependências necessárias para que a automação seja executada de forma limpa.

## Configuração
Para executar a automação, não é necessária nenhuma IDE (ambiente de desenvolvimento), só abrir o terminal na raiz do projeto e executar o comando abaixo:

```shell
protractor
```

Quando os testes forem finalizados, para ver os resultados em um relatorio é preciso executar o seguinte comnado 
```shell
allure serve
```
<div align="center">
    <img width="750" src="Allure-reports-screens/pagina-Inicia.jpeg" />
    <p>Página inicial do Allure.</p>
</div>