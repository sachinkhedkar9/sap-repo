(function () {
    'use strict';

    angular
        .module('guidedBuyingApp')
        .service('processFlowAttributeProvider', processFlowAttributeProvider);

    function processFlowAttributeProvider(){

        this.getColor = function(state){
          switch(state){
            case 'completed':
            return '#58b957';
            break;
            case 'current':
            return '#199de0';
            break;
            default:
            return '#969696';
          }
        }
    }
  })();
