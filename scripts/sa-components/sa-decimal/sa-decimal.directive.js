(function () {
  'use strict';
  angular
    .module('src')
    .directive('saiDecimal', saiDecimal);

  function saiDecimal() {
    var directive = {
      restrict: 'AE',
      priority:1200,
      require:'ngModel',

      controller:saiDecimalController

    };
    saiDecimalController.$inject = ['$scope'];
    return directive;
   
    function saiDecimalController($scope){

      $scope.getRegex = function(){
          if(typeof($scope.comp.config.decimal.precision) !== 'undefined')
              $scope.regex = '^[0-9]+(\.[0-9]{0,'+$scope.comp.config.decimal.precision+'})?$';
          else
              $scope.regex = '^[0-9]+(\.[0-9]{1,2})?$';
        return $scope.regex;
      };
    }

  }



})();
