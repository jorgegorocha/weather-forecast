(function () {

    var app = angular.module("weatherForecast");

    var MainController = function ($scope, $location) {
        //required for googleplace directive
        $scope.gPlace = null;
        
        //called when form is submitted on homepage or top bar
        $scope.search = function (text, isValid) {
            if (isValid) {
                //redirects to the weather results page which is responsible for calling the api service
                $location.path("/weather/" + text);
            }
        };
    };

    app.controller("MainController", ['$scope', '$location', MainController]);
} ());