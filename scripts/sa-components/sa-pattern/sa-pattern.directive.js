/**
 * Created by nemade_g on 6/21/2016.
 */
/**
 * Created by nemade_g on 6/21/2016.
 */
(function () {
    'use strict';
    angular
        .module('src')
        .directive('saiPattern', saiPattern);

    function saiPattern() {
        var directive = {
            restrict: 'AE',
            link: saiPatternLink
        };

        return directive;

        function saiPatternLink(scope, el, attr) {
            //link function of directive
            scope.regex = scope.$eval(attr.saiPattern);
            scope.getRegex = function(){
                return scope.regex;
            };
        }
    }





})();
