describe('routes tests', function () {
    'use strict';

    var httpBackend, route, location, scope;

    beforeEach(module("weatherForecast"));

    beforeEach(inject(function ($httpBackend, $route, $location, $rootScope) {
        httpBackend = $httpBackend;
        route = $route;
        location = $location;
        scope = $rootScope.$new();
    }));

    it('should load the search.html template and MainController', function () {
        httpBackend.whenGET('search.html').respond('...');
        scope.$apply(function () {
            location.path('/search');
        });
        expect(route.current.templateUrl).toEqual('search.html');
        expect(route.current.controller).toEqual('MainController');
    });
    
        it('should load the weather.html template and WeatherController', function () {
        httpBackend.whenGET('weather.html').respond('...');
        scope.$apply(function () {
            location.path('/weather/porto');
        });
        expect(route.current.templateUrl).toEqual('weather.html');
        expect(route.current.controller).toEqual('WeatherController');
    });

});