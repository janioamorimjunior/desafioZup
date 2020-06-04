const {SpecReporter} = require('jasmine-spec-reporter');
const AllureReporter = require('jasmine-allure-reporter');

exports.config = {

    allScriptsTimeout: 120000,

    directConnect: true,
    capabilities: {
        browserName: 'firefox',
        shardTestFiles: false,
        maxInstances: 1,
        count: 1,
    },
    framework: 'jasmine',
    suites: {
        pesquisa: [
            './e2e/specs/pesquisa.e2e-spec.ts'
        ],
        carrinho: [
            './e2e/specs/carrinho.e2e-spec.ts'
        ],
        produto: [
            './e2e/specs/produto.e2e-spec.ts'
        ]
    },
    logLevel: 'INFO',
    beforeLaunch: () => {
        require('ts-node').register({
            project: './tsconfig.e2e.json'
        });
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 120000,
        showColors: true,
        random: false,
    },

    onPrepare: () => {

        jasmine.getEnv().addReporter(new SpecReporter({
            suite: {
                displayNumber: true
            },
            spec: {
                displayStacktrace: true,
                displayErrorMessages: true,
                displayFailed: true,
                displayDuration: true
            },
            summary: {
                displayErrorMessages: true,
                displayStacktrace: false,
                displaySuccessful: true,
                displayFailed: true,
                displayDuration: true
            },
            colors: {
                enabled: true,
                successful: 'blue',
                failed: 'red',
                pending: 'yellow'
            },
            prefixes: {
                successful: '✓ ',
                failed: '✗ ',
                pending: '* '
            },
        }));

        jasmine.getEnv().addReporter(new AllureReporter({
            resultsDir: 'allure-results'
        }));

        jasmine.getEnv().afterEach(function(done){

          browser.takeScreenshot().then(function (png) {
            allure.createAttachment('Screenshot', function () {
              done();
              return new Buffer(png, 'base64')}, 'image/png')();
          })
        });

        browser.ignoreSynchronization = true;
    },

};