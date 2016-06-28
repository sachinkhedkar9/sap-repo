(function () {
    'use strict';
    angular
        .module('src')
        .directive('saiWholeNumber', saiWholeNumber);

    function saiWholeNumber() {
        var directive = {
            restrict: 'AE',
            require:'ngModel',
            link: saiWholeNumberLink,

        };
        return directive;

        function saiWholeNumberLink(scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var oldText = text;
                    if(typeof text !== 'string'){
                        text = text.toString(); // to make regex work.
                        if(text.indexOf('.') !== -1){
                            text = text.split('.')[0];
                        }
                    }
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== oldText) {

                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return +transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }

    }
})();