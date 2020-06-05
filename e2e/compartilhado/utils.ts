import { browser } from "protractor";

export class Utils {
    static tirarScrennShotParaReport() {
        var allure: any;

        browser.takeScreenshot().then(function (png) {
            allure.createAttachment(
                "Screenshot",
                function () {
                    return new Buffer(png, "base64");
                },
                "image/png"
            )();
        });
    }

    static async pegarAPrimeiraPalavraDaString(string: string) {
        const strings: string[] = string.split(" ");

        return strings[0];
    }
    static assertEquals(esperado: any, atual: any) {
        return expect(atual).toEqual(esperado);
    }

    static assertToContain(atual: any, contem: any) {
        return expect(atual).toContain(contem);
    }

    static assertNotToContain(atual: any, contem: any) {
        return expect(atual).not.toContain(contem);
    }

    static assertNotEquals(esperado: any, atual: any) {
        return expect(atual).not.toEqual(esperado);
    }

    static assertMatch(esperado: any, atual: any) {
        return expect(atual).toMatch(esperado);
    }

    static assertTrue(bool: boolean) {
        return expect(bool).toBe(true);
    }

    static assertFalse(bool: boolean) {
        return expect(bool).toBe(false);
    }

    static gerarnumeroaleatorio(min: number, max: number) {
        min = Math.ceil(min);

        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    }

    static paraMinusculo(texto: string) {
        const palavra = texto.toLowerCase();

        return palavra;
    }
}
