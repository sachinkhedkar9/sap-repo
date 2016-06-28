/**
 * Created by nemade_g on 6/16/2016.
 */
(function () {
  'use strict';
  angular
    .module('src')
    .directive('saRender', saRender);
  saRender.$inject = ['$parse'];
  function
  saRender($parse) {
    var directive = {
      restrict: 'AE',
      templateUrl: 'scripts/sa-components/sa-render/sa-render.directive.html',
      replace: true,
      compile: function (el, atrs) {
        var config = $parse(atrs.config);
        return getSaRenderLink(config);
      },
      controller: saRenderCtrl,
      // note: This would be 'saRenderCtrl' (the exported controller name, as string)
      // if referring to a defined controller in its separate file.
      controllerAs: 'sarender'
      // bindToController: true // because the scope is isolated
    };

    return directive;

    function getSaRenderLink(config) {
      //link function of directive
      return function (scope, el, attr, sarender) {
        sarender.config = (config(scope) || scope);
        scope.$watch(function () {
          return sarender.config.ngmodel;
        }, function (newValue, oldValue) {
          if (newValue !== oldValue) {
            sarender.config.key = sarender.config.ngmodel + '-' + sarender.config.id;
          }

        });

        sarender.form = $parse(sarender.config.formName)(scope);
      };
    }
  }

  saRenderCtrl.$inject = ['$scope'];

  function saRenderCtrl() {
    // Injecting $scope just for comparison


  }

})();
