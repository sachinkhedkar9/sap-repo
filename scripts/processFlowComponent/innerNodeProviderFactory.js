/**
 * Created by nemade_g on 6/19/2016.
 */
(function () {
  'use strict';

  angular
    .module('src')
    .factory('InnerNodeProvider', innerNodeProvider);

  function innerNodeProvider() {

    var provider = function(thisItem, parentNode, data){
      this.data = data;
    };

    provider.prototype.getInnerNode = function () {
      console.log('data in service : ', thisItem);
      d3.select(parentNode).append('circle').attr({
          // 'r': 10,
          'r': 7,
          'cx': thisItem.attr('cx'),
          'cy': thisItem.attr('cy'),
          'fill': color
      });
      return this;
    };

    provider.prototype.applyDirectives = function () {
      return this.getInnerNode();
      };
    return provider;
  }
})();
