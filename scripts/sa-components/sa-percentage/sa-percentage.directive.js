(function () {
  'use strict';
  angular
    .module('src')
    .directive('saPercentage', saPercentage);

  function saPercentage() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'scripts/sa-components/sa-percentage/sa-percentage.html',
      replace: true,
      link: saPercentageLink
    //  controller: saPercentageCtrl,
      // note: This would be 'saPercentageCtrl' (the exported controller name, as string)
      // if referring to a defined controller in its separate file.
    //  controllerAs: 'vm'
      // bindToController: true // because the scope is isolated
    };

    return directive;

    function saPercentageLink(scope, el, attr) {
      //link function of directive
      scope.postText = (scope.preText || '') + (scope.$eval(attr.saPercentage).symbol);

    }
  }

 /* saPercentageCtrl.$inject = ['$scope'];

  function saPercentageCtrl($scope) {
    // Injecting $scope just for comparison
    var vm = this;


  }*/

})();
