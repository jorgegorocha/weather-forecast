describe('slice filter tests', function () {
  'use strict'; 

  var $filter;

  beforeEach(function () {
    module('weatherForecast');

    inject(function (_$filter_) {
      $filter = _$filter_;
    });
  });

  it('should return an empty array', function () {
    var array = [];
    var result = $filter('slice')(array, 1, 2);
    expect(result).toEqual([]);
  });
  
  it('should return an array with 2 positions', function () {
    var array = [1 , 2, 3];
    var result = $filter('slice')(array, 0, 2);
    expect(result.length).toEqual(2);
  });
  
  it('should return the original array', function () {
    var array = [1, 2, 3];
    var result = $filter('slice')(array, 0, 5);
    expect(result).toEqual(array);
  });
  
  it('should return the original array without the first position', function () {
    var array = [1, 2, 3];
    var result = $filter('slice')(array, 1, 3);
    expect(result).toEqual([2, 3]);
  });
});