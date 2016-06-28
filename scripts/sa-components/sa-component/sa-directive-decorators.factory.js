/**
 * Created by nemade_g on 6/19/2016.
 */
(function () {
  'use strict';

  angular
    .module('src')
    .factory('SaDirectiveDecorators', directiveDecorators);

  function directiveDecorators() {

    //RETURNS OBJECT FOR FACTORY.
    var provider = function(template, config){
      this.template = template;
      this.config = config;
    };
    provider.prototype.addDecimal = function () {
      if(this.config && this.config.decimal){
        var dirText = 'data-xsai-decimal = "comp.config.decimal"  ';
        this.template = this.template.replace('<sa-input', '<sa-input ' + dirText);
      }
      return this;
    };
    provider.prototype.addPercentage = function(){
      if (this.config && this.config.percentage) {
              var dirText = ' data-xsai-percentage = "comp.config.percentage"';
              this.template = this.template.replace('<sa-input', '<sa-input ' + dirText);
              }
      return this;
    };
    provider.prototype.addCurrency = function () {
      if(this.config && this.config.currency){
        var dirText = 'data-xsai-currency = "comp.config.currency"';
        this.template = this.template.replace('<sa-input', '<sa-input ' + dirText);
      }
    
      return this;
    };
    provider.prototype.addPattern = function () {
      if(this.config && this.config.regexPattern){
        var dirText = 'data-xsai-pattern = "comp.config.regexPattern"  ';
        this.template = this.template.replace('<sa-input', '<sa-input ' + dirText);
      }
      return this;
    };
    provider.prototype.addWholeNumbers = function(){
      if(this.config && this.config.wholeNumber){
        var dirText = ' data-xsai-whole-number  ';
        this.template = this.template.replace('<sa-input', '<sa-input ' + dirText);
      }
      return this;
    };
    provider.prototype.applyDirectives = function () {
      return this.addCurrency()
        .addDecimal()
        .addPercentage()
        .addPattern()
          .addWholeNumbers();


    };
    return provider;
  }
})();
