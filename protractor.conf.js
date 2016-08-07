exports.config = {
    framework: 'jasmine',
    seleniumServerJar: 'node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.1.jar',
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['source/tests/protractor/**/*.js']
}