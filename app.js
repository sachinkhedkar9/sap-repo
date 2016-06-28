'use strict';

/**
 * @ngdoc overview
 * @name srcApp
 * @description
 * # srcApp
 *
 * Main module of the application.
 */
 angular.module('guidedBuyingApp',[]);
angular.module('src',['ngMessages']);
angular
  .module('srcApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'angular.filter',
    'restangular',
      'src',
      'guidedBuyingApp'
  ]);
