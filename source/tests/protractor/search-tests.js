// spec.js
describe('search page tests', function () {
    var searchInput = element(by.css('.form-input'));
    var searchButton = element(by.css('.btn-primary'));

    beforeEach(function () {
        browser.get('http://localhost:8000/#/search');
    });

    it('should redirect to weather page if location is filled', function () {
        searchInput.sendKeys('Porto');
        searchButton.click();

        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/weather/Porto');
    });
    
    it('should stay in the same page if location is empty', function () {
        searchButton.click();

        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/search');
    });
});