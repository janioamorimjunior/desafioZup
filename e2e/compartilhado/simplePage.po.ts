import {
  ElementFinder,
  browser,
  protractor
} from "protractor";

export class SimplePage {
  timeout = 30000;

  async logInfo(str: string) {
    return browser.logger.info(str);
  }

  async logWarn(str: string) {
    return browser.logger.warn(str);
  }

  async logError(str: string) {
    return browser.logger.error(str);
  }

  async cliclarVariosElementos(...menus: ElementFinder[]) {
    for (const webElemento of menus) {
      await this.esperarPresencaDe(webElemento);

      await this.clicarElemento(webElemento);
    }
  }

  async inserirDado(elementFinder: ElementFinder, value: string) {
    await this.esperarVisibilidadeDo(elementFinder);

    await this.limparCampo(elementFinder);

    await elementFinder.sendKeys(value);
  }

  async limparCampo(elementFinder: ElementFinder) {
    await elementFinder.clear();
  }

  async dimensionarTela(height: number, width: number) {
    return browser.driver.manage().window().setSize(width, height);
  }

  async pegarIdCampo(elementFinder: ElementFinder) {
    return await elementFinder.getAttribute("id");
  }

  async esperarElementoFicarClicavel(
      elementFinder: ElementFinder,
      optMessage?: string
  ) {
    return browser.wait(
        protractor.ExpectedConditions.elementToBeClickable(elementFinder),
        this.timeout,
        optMessage
    );
  }

  async esperarVisibilidadeDo(
      elementFinder: ElementFinder,
      optMessage?: string
  ) {
    await browser
        .wait(
            protractor.ExpectedConditions.visibilityOf(elementFinder),
            this.timeout,
            optMessage
        )
        .catch((err) => {
          this.logError(err);
        });
  }

  async esperarPresencaDe(elementFinder: ElementFinder, optMessage?: string) {
    return browser.wait(
        protractor.ExpectedConditions.presenceOf(elementFinder),
        this.timeout,
        optMessage
    );
  }

  async pegarAtributo(elementFinder: any, atributo: string) {
    return elementFinder.getAttribute(atributo);
  }

  async esperarInvisibilidadeDe(
      elementFinder: ElementFinder,
      optMessage?: string
  ) {
    return browser.wait(
        protractor.ExpectedConditions.invisibilityOf(elementFinder),
        this.timeout,
        optMessage
    );
  }

  esperarEmMilisegundos(timeout: number) {
    return browser.sleep(timeout);
  }

  pegarTituloPagina() {
    return browser.getTitle();
  }

  pegarItemDoLocalStorage(item: string) {
    return this.executeScript('return localStorage.getItem("' + item + '");');
  }

  executeScript(script: string | Function) {
    return browser.executeScript(script);
  }

  async elementoEstaPresente(elementFinder: ElementFinder) {
    return await elementFinder.isPresent();
  }

  pegarTexto(elementFinder: ElementFinder) {
    return elementFinder.getText().then((text) => {
      return text.replace(/\s/g, " ");
    });
  }

  pressionarBotao(key: string) {
    return browser.actions().sendKeys(key).perform();
  }

  async pegarTextoDeInputs(elementFinder: ElementFinder) {
    await this.esperarVisibilidadeDo(elementFinder);

    return await elementFinder.getAttribute("value");
  }

  async irAteElemento(elementFinder: ElementFinder) {
    await this.esperarElementoFicarClicavel(elementFinder);

    this.esperarEmMilisegundos(1000);

    await browser.executeScript(
        "arguments[0].scrollIntoView(false);",
        elementFinder.getWebElement()
    );
  }

  scrollUP() {
    browser.executeScript("window.scrollTo(0,0);");
  }

  async scrollDown() {
    return await browser.executeScript("window.scrollTo(0,10000);");
  }

  async clicarElemento(elementFinder: ElementFinder, optMessage?: string) {
    await this.esperarElementoFicarClicavel(elementFinder, optMessage);
    await elementFinder.click();
  }

  async naoEhClicavel(element: ElementFinder) {
    return element.isPresent().then((isPresent) => {
      if (isPresent) {
        return element.isDisplayed().then((isDisplayed) => {
          if (isDisplayed) {
            return !element.isEnabled();
          }
          return true;
        });
      }
      return true;
    });
  }

  async clicarComBotaoDireito(elementFinder: ElementFinder) {
    return browser
        .actions()
        .mouseMove(elementFinder)
        .click(protractor.Button.RIGHT)
        .perform();
  }

  duploClick(elementFinder: ElementFinder) {
    return browser.actions().mouseMove(elementFinder).doubleClick().perform();
  }

  recarregarPagina() {
    browser.navigate().refresh();
  }

  async pegarUrlAtual() {
    return browser.getCurrentUrl();
  }

  async navegarAte(url: string) {
    await browser.get(url);
  }
}
