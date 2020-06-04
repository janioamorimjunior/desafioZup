# desafioZup

## Descrição

Este projeto trata se de uma forma de apresentar o meu trabalho para a empresa zup, foi pedido para escolher um grande portal de comércio online e automatizar testes nele, foi escolhida a Americanas, com isso esse projeto foi elaborado com o auxílio do **Protractor** (framework end-2-end), responsável pela automação, e o **Allure Report**, cujo papel é gerar realtorio sobre a automação.

## Iniciando
Para ter acesso ao **protractor** é necessário poussuir o **npm (Gerenciador de Pacotes do Node)** instalado na maquina, para executar o comando abaixo:
```
npm install -g protractor
```
Fora o **protractor**, é instalado junto nesse comando o **webdriver-manager**, que nada mais é do que um gerenciador de instâncias 
do selenium server e para baixar ou atualizar os drivers do selenium é preciso executar a seguinte linha de comando:
```
webdriver-manager update
```
depois de clonado o projeto, é preciso instalar as dependências dele usando o comando seguinte na raiz:
```
npm install
```
depois só executar o comando protractor na raiz do projeto que o teste vai iniciar;

dps que o teste finaliza, para subir o report do allure precisa executar o comando seguinte:
```
allure serve
```