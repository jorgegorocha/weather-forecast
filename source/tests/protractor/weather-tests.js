// spec.js
describe('weather page tests', function () {
    var searchInput = element(by.css('.form-input'));
    var searchButton = element(by.css('.btn-primary'));
    var errorSpan = element(by.binding('error'));

    beforeEach(function () {
        browser.get('http://localhost:8000/#/weather/porto');
    });

    it('should redirect to weather page with new location on searchbar click', function () {
        searchInput.sendKeys('Viseu');
        searchButton.click();

        expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/#/weather/Viseu');
    });

    it('should display error message if location dont match regex', function () {
        browser.get('http://localhost:8000/#/weather/jauefe468');

        expect(errorSpan.getText()).toEqual('Invalid location, please try another one!');
    });

    it('should display error message if location doesnt exist but match regex', function () {
        searchInput.sendKeys('zdghztfgth');
        searchButton.click();

        expect(errorSpan.getText()).toEqual('Location not found, please try a different one!');
    });
});