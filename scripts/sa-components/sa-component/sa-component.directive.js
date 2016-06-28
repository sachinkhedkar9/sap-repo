/**
 * Created by nemade_g on 6/18/2016.
 */
(function () {
  'use strict';
  angular
    .module('src')
    .directive('saComponent', saComponent);
  saComponent.$inject = [ '$templateCache',  '$parse', '$compile', 'SaDirectiveDecorators'];
  function saComponent($templateCache, $parse, $compile, SaDirectiveDecorators) {
    var directive = {
      restrict: 'AE',
      templateUrl: 'scripts/sa-components/sa-component/sa-component.directive.html',
      link: saComponentLink,
      controller:saComponentCtrl,
      controllerAs:'comp',
      scope:{
        config:'='
      },
      // note: This would be 'saComponentCtrl' (the exported controller name, as string)
      // if referring to a defined controller in its separate file.
      bindToController: true // because the scope is isolated
    };
    return directive;
    function saComponentCtrl() {

    }
    function saComponentLink(scope, el, attr, comp) {
      //link function of directive
      var templateType = 'text'; // default templateType is text
     function processInputType(){

         comp.config.inputType = comp.config.answerType;


         /**
        * @abbr: sw
        * @desc: switch statement
        * @param: conf.answerType
        * @parm: 'text','email','date'
        **/
       switch (comp.config.answerType) {
         case 'text':
         case 'email':
         case 'checkbox':
         case 'SingleLineLimited':
           templateType='text';

           break;
           case 'number':
               templateType='text';

               break;
         case 'wholeNumber':
           templateType='text';
             comp.config.inputType = 'number';
           comp.config.wholeNumber = true;
           delete comp.config.decimal;
           break;
         default:
           templateType = comp.config.answerType;
       }
     }
      processInputType();

      scope.$watch(function () {
        return comp.config.ngmodel;
      }, function (newValue) {
        if (!comp.config.key || comp.config.key .indexOf(newValue) === -1) {
          comp.config.key = comp.config.ngmodel + '-' + comp.config.id;
        }

      });

      comp.form = $parse(comp.config.formName)(scope);

      scope.$watchCollection(function(){
        return [comp.config.decimal,
            comp.config.currency,
            comp.config.answerType,
            comp.config.regexPattern
        ];
      }, function () {
        processInputType();
        refresh();
      });
// refresh();
      var childScope;
      function refresh() {
        var template = $templateCache.get('saTemplates-' + templateType);
        var decors = new SaDirectiveDecorators(template, comp.config);
        template = decors.applyDirectives().template;
        // scope.$watch('config',function (nv,ov) {
        //

        if(childScope){
          childScope.$destroy();
          childScope = null;
          el.html('');
        }
        childScope = scope.$new();
        // if(scope.$$childHead){
        //    scope.$$childHead.$destroy();
        //   scope.$$childHead = null;
        //   el.html('');
        // }

        el.append($compile(template)(childScope));
        // });
      }



    }
  }




})();
