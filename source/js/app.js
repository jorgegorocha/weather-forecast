(function(){
    
    var app = angular.module("weatherForecast", ["ngRoute"]);
    
    var config = function($routeProvider){
        $routeProvider
            .when("/search", {
                templateUrl: "search.html",
                controller: "MainController"
            })
            .when("/weather/:location", {
                templateUrl: "weather.html",
                controller: "WeatherController"
            })
            .otherwise({redirectTo:"/search"});
    };
    
    app.config(['$routeProvider', config]);
    
}());