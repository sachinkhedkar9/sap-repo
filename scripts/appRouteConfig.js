'use strict';
angular.module('srcApp')

    .config(['$stateProvider', function($stateProvider){
      $stateProvider.
          state({
              name: 'examples',
              url :'/examples',
              templateUrl: 'scripts/examples/example.html',
              controller: 'ExampleController',
              controllerAs:'egctrl'
          })
          .state({
              name: 'processFlow',
              url: '/processflow',
              templateUrl: 'html/partials/processFlow.html',
              controller: 'processFlowController'
          });

    }]);
