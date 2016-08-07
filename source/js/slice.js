(function () {

    var app = angular.module("weatherForecast");

    var slice = function () {
        return function (arr, start, end) {
            return (arr || []).slice(start, end);
        };
    };

    app.filter('slice', slice);
    
} ());