/**
 * Created by nemade_g on 6/14/2016.
 */
(function () {
  'use strict';
  angular.module('src').controller('ExampleController', ExampleController);
  ExampleController.$inject = ['$scope'];
  function ExampleController($scope,$log) {

    var vm = this;
    vm.questions = [
        {
  'id': 1.22,
  'formName': 'urlForm',
  'ngmodel': 'editable',
  'required': false,
  'editable': true,
  'regexPattern': '',
  'currency': {
    'symbol': '$'
  },
  'answerType': 'checkbox',
  'range': {
    'minValue': '',
    'maxValue': ''
  },
  'limit': 1000,
  'acceptableValues': [
    'United States',
    'Germany',
    'China'
  ],
  'allowMultipleValues': true,
  'allowOtherValues': true,
  'decimalBool': false,
  'inputType': 'checkbox',
  'key': 'editable-1.22',
  'title': 'Testing Checkbox',
  'wholeNumber': false,
  'price': 39
},
        {
            'id': 1.22,
            'formName': 'urlForm',
            'ngmodel': 'label',
            'required': false,
            'editable': true,
            'regexPattern': '[A-Z]',
            'currency': {
                'symbol': '$'
            },
            'answerType': 'SingleLineLimited',
            'range': {
                'minValue': '',
                'maxValue': ''
            },
            'limit': 1000,
            'acceptableValues': [
                'United States',
                'Germany',
                'China'
            ],
            'allowMultipleValues': true,
            'allowOtherValues': true,
            'decimalBool': false,
            'inputType': 'SingleLineLimited',
            'key': 'label-1.22',
            'title': 'Testing Custom regex for username',
            'wholeNumber': false,
            'price': 39
        },
        {
        'id': 1.22,
        'formName': 'urlForm',
        'label': 'gad@dgad',
        'ngmodel': 'price',
        'required': false,
        'editable': true,
        'regexPattern': '',
        'currency': {
          'symbol': '$'
        },
        'answerType': 'number',
        'range': {
          'minValue': '10',
          'maxValue': '40'
        },
        'limit': 1000,
        'acceptableValues': [
          'United States',
          'Germany',
          'China'
        ],
        'allowMultipleValues': true,
        'allowOtherValues': true,
        'decimalBool': true,
        'inputType': 'number',
        'key': 'price-1.22',
        'title': 'Testing Decimal with precesion',
        'wholeNumber': false,
        'price': 39,
        'decimal': {
          'precision': 3
        }
      },
        {
        'id': 1.22,
        'formName': 'urlForm',
        'label': 'gad@dgad',
        'ngmodel': 'price',
        'required': false,
        'editable': true,
        'regexPattern': '',
        'currency': {
          'symbol': '$'
        },
        'answerType': 'wholeNumber',
        'range': {
          'minValue': '10',
          'maxValue': '40'
        },
        'limit': 1000,
        'acceptableValues': [
          'United States',
          'Germany',
          'China'
        ],
        'allowMultipleValues': true,
        'allowOtherValues': true,
        'decimalBool': false,
        'inputType': 'number',
        'key': 'price-1.22',
        'title': 'Testing Whole Number with Range',
        'wholeNumber': true,
        'price': 40
      },
        {
        'id': 1.22,
        'formName': 'urlForm',
        'label': 'gad@dgad',
        'ngmodel': 'price',
        'required': false,
        'editable': true,
        'regexPattern': '',
        'currency': {
          'symbol': '$'
        },
        'answerType': 'SingleLineLimited',
        'range': {
          'minValue': '10',
          'maxValue': '40'
        },
        'limit': 1000,
        'acceptableValues': [
          'United States',
          'Germany',
          'China'
        ],
        'allowMultipleValues': true,
        'allowOtherValues': true,
        'decimalBool': true,
        'inputType': 'SingleLineLimited',
        'key': 'price-1.22',
        'title': 'Testing Decimal Input',
        'wholeNumber': false,
        'price': '4.123',
        'decimal': {
          'precision': 3
        }
      },
        {
        'id': 1.22,
        'formName': 'urlForm',
        'label': 'gad@dgad',
        'ngmodel': 'price',
        'required': false,
        'editable': true,
        'regexPattern': '',
        'currency': {
          'symbol': '$'
        },
        'answerType': 'number',
        'range': {
          'minValue': '10',
          'maxValue': '40'
        },
        'limit': 1000,
        'acceptableValues': [
          'United States',
          'Germany',
          'China'
        ],
        'allowMultipleValues': true,
        'allowOtherValues': true,
        'decimalBool': false,
        'inputType': 'number',
        'key': 'price-1.22',
        'title': 'Testing Number Input',
        'wholeNumber': true,
        'price': 40
      },
        {
        'id': 1.22,
        'formName': 'urlForm',
        'label': 'gad@dgad',
        'ngmodel': 'label',
        'required': false,
        'editable': true,
        'regexPattern': '',
        'currency': {
          'symbol': '$'
        },
        'answerType': 'email',
        'range': {
          'minValue': '',
          'maxValue': ''
        },
        'limit': 1000,
        'acceptableValues': [
          'United States',
          'Germany',
          'China'
        ],
        'allowMultipleValues': true,
        'allowOtherValues': true,
        'decimalBool': false,
        'inputType': 'email',
        'key': 'label-1.22',
        'title': 'Testing Email input'
      },
        {
        'id': 1.22,
        'formName': 'urlForm',
        'label': 'label question 1',
        'ngmodel': 'label',
        'required': false,
        'editable': true,
        'regexPattern': '',
        'currency': {
          'symbol': '$'
        },
        'answerType': 'SingleLineLimited',
        'range': {
          'minValue': '',
          'maxValue': ''
        },
        'limit': 1000,
        'acceptableValues': [
          'United States',
          'Germany',
          'China'
        ],
        'allowMultipleValues': true,
        'allowOtherValues': true,
        'decimalBool': false,
        'inputType': 'SingleLineLimited',
        'key': 'label-1.22',
        'title': 'Testing Required and Editable'
      }

    ];

    vm.test = 'pppp';
    vm.required = true;
    vm.doAction1 = function(){
      $log.log('doing smething1', $scope.$id);
    };
   vm.doAction2 = function(){
     $log.log('doing smething2', $scope.$id);
    };
   vm.doAction3 = function(){
     $log.log('doing smething3', $scope.$id);
    };
vm.decimalChanged = function ( q, initialised) {
  if(initialised && !!q.decimal){
    q.decimalBool = true;
  }
  if(q.decimalBool){
    q.decimal = {
      precision:3
    };
  }else{
    delete q.decimal;
  }
};
    vm.addQuestion = function (q) {
      vm.questions.push(q || vm.selectedQ);
      if(!vm.selectedQ)
          vm.selectedQ = {};

    };
  }
})();
