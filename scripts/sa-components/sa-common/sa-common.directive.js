/**
 * Created by nemade_g on 6/14/2016.
 */
(function () {
  'use strict';
  angular
    .module('src')
    .directive('saCommon', saCommon);

  function saCommon() {
    var directive = {
      restrict: 'AE',
      template: '',
      require:'ngModel',
      compile: saCommonCompile

      // note: This would be 'saCommonCtrl' (the exported controller name, as string)
      // if referring to a defined controller in its separate file.
      // bindToController: true // because the scope is isolated
    };
        return directive;

    function saCommonCompile(el) {
      var dest = el[0].getElementsByClassName('component')[0],
              attrsToExclude = ['sa-common', 'sa-currency'],
                i, len, source = el.parent()[0];
            var elAttrs = [].slice.call(source.attributes);
            for (i = 0, len = elAttrs.length; i < len; i++) {
              var at = elAttrs[i];

              if(attrsToExclude.indexOf(at.nodeName) !== -1 || at.nodeName.indexOf('sa-') !== -1){
                continue;
              }
              if(at.nodeName) {
                source.removeAttribute(at.nodeName);
                dest.setAttribute(at.nodeName.replace('data-x',''), at.nodeValue);
              }
              dest.setAttribute('ng-pattern', 'getRegex()');
            }

    }
  }


})();
