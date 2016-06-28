/**
 * Created by nemade_g on 6/16/2016.
 */
(function () {
  'use strict';
  angular
    .module('src')
    .directive('saiCurrency', saCurrency);
  function saCurrency() {
    var directive = {
      restrict: 'AE',

      require: 'ngModel',
      link: saCurrencyLink
    };

    return directive;

    function saCurrencyLink(scope, el, attr) {

      scope.preText = (scope.preText || '') + (scope.$eval(attr.saiCurrency).symbol||'no-currency-symbol');
    }
  }


})();
