/**
 * Created by nemade_g on 6/14/2016.
 */
(function () {
  'use strict';
  angular
    .module('src')
    .directive('saInput', saTextbox);

  function saTextbox() {
    var directive = {
      restrict: 'AE',
      // replace:true,
      templateUrl: 'scripts/sa-components/sa-input/sa-input.directive.html',
      scope:true,
      link:function(scope, el, attrs){
       // console.log('scope in textbox', scope.$id);
        if(attrs.preText) {
          scope.preText = attrs.preText;
        }
      }
      // bindToController: true // because the scope is isolated
    };
    return directive;

  }


})();
