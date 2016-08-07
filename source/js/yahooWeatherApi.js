(function () {

    var yahooWeatherApi = function ($http) {
        var isLoading = false;
        var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=\"%s\") and u='c'";
        var url = "https://query.yahooapis.com/v1/public/yql?format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&q=";

        var buildRequest = function (text) {
            return url + query.replace("%s", text);
        };

        //method responsible for making the http call
        //only makes the call if there isnt another request at the same time
        var getWeatherForecastByLocation = function (location) {
            if (isLoading === false) {
                isLoading = true;
                return $http.get(buildRequest(location))
                    .then(function (response) {
                        isLoading = false;
                        return response.data;
                    });
            }
        };

        return {
            getWeatherForecastByLocation: getWeatherForecastByLocation,
            buildRequest: buildRequest
        };

    };

    var module = angular.module("weatherForecast");
    module.factory("yahooWeatherApi", ['$http', yahooWeatherApi]);

} ());