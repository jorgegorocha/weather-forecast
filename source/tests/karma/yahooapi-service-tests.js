describe('yahoo api service tests', function () {
    'use strict';

    var yahooWeatherApi, httpBackend;

    beforeEach(module("weatherForecast"));

    beforeEach(inject(function (_yahooWeatherApi_, $httpBackend) {
        yahooWeatherApi = _yahooWeatherApi_;
        httpBackend = $httpBackend;
    }));

    var apiResponseForExistingLocation = {
        query: {
            results: []
        }
    }
    
    var apiResponseForNonExistingLocation = {
        query: {
            results: null
        }
    }

    it('should get the weather conditions for the given location', function () {
        httpBackend.whenGET(yahooWeatherApi.buildRequest('Porto')).respond(apiResponseForExistingLocation);
        yahooWeatherApi.getWeatherForecastByLocation('Porto').then(function (data) {
            expect(data.query.results).not.toEqual(null);
        });
        httpBackend.flush();
    });
    
    it('should return null if location in non existant', function () {
        httpBackend.whenGET(yahooWeatherApi.buildRequest('hjkhikm15151')).respond(apiResponseForNonExistingLocation);
        yahooWeatherApi.getWeatherForecastByLocation('hjkhikm15151').then(function (data) {
            expect(data.query.results).toEqual(null);
        });
        httpBackend.flush();
    });

});