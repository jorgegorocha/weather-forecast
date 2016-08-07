(function () {

    var app = angular.module("weatherForecast");

    var WeatherController = function ($scope, $routeParams, yahooWeatherApi) {
        //success callback
        var onSuccess = function (data) {
            $scope.isLoading = false;
            //checks for results, if they are not set then the location doesnt exist
            if (data.query.results) {
                $scope.weatherResults = data.query.results;
            } else {
                $scope.error = "Location not found, please try a different one!";
                $scope.weatherResults = null;
            }
        };

        //error calback
        var onError = function (reason) {
            $scope.isLoading = false;
            $scope.error = "Something went wrong, please try again!";
            $scope.weatherResults = null;
        };

        //calls the api service if there is a valid input
        var getWeatherForecastForLocation = function (location) {
            ///^[-,a-zA-ZÀ-ž\s]*$/
            var regex = new RegExp("^[-,a-zA-Z\u00C0-\u017F\u0020]*$");
            if (location !== null && location !== '' && regex.test(location)) {
                $scope.isLoading = true;
                yahooWeatherApi.getWeatherForecastByLocation($routeParams.location)
                    .then(onSuccess, onError);
            } else {
                $scope.isLoading = false;
                $scope.error = "Invalid location, please try another one!";
                $scope.weatherResults = null;
            }
        };

        //calls the api service on page load with the url param
        getWeatherForecastForLocation($routeParams.location);
    };

    app.controller("WeatherController", ['$scope', '$routeParams', 'yahooWeatherApi', WeatherController]);

} ());