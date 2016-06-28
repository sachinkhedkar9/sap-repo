/**
 * Created by nemade_g on 6/8/2016.
 */
(function () {
    'use strict';
    angular.module('guidedBuyingApp').controller('processFlowController', processFlowCtroller);
    processFlowCtroller.$inject = ['$scope', 'processFlowAttributeProvider'];
    function processFlowCtroller($scope, processFlowAttributeProvider) {

        var vm = this;

        $scope.data =  [{"id":"request","caption":"Request","state":"completed","targets":[{"id":"autoApproval"}]},{"id":"autoApproval","caption":"Auto Approval","state":"completed","targets":[{"id":"order","direction":"right"}]},{"caption":"Order","id":"order","state":"current","targets":[{"id":"received_order","direction":"right"}]},{"caption":"Received Order","id":"received_order","state":"inactive"}]
        ;
        // $scope.data = [{"id":"request","caption":"Request","state":"completed","targets":[{"id":"autoApproval"},{"id":"a"},{"id":"b"},{"id":"c"},{"id":"d"}]},{"id":"autoApproval","caption":"Auto Approval","state":"completed","targets":[{"id":"order","direction":"right"}]},{"caption":"Order","id":"order","state":"current","targets":[{"id":"received_order","direction":"right"}]},{"caption":"Received Order","id":"received_order","state":"inactive"},{"caption":"a","id":"a"},{"caption":"b","id":"b","targets":[{"id":"d"}]},{"caption":"c","id":"c"},{"caption":"d","id":"d"}];
        $scope.node = {};

        angular.forEach($scope.data, function(data){
          data.color = processFlowAttributeProvider.getColor(data.state);
        });

        $scope.addNode = function(node){
            node.state = (node.state) ? node.state : 'inactive';
            node.color = processFlowAttributeProvider.getColor(node.state);
            $scope.data.push(node);
            resetNewNode();

        };
        $scope.deleteNode = function(node){
            var index = $scope.data.indexOf(node);
            if (index > -1) {
                $scope.data.splice(index, 1);
            }

            for (var i = 0; i < $scope.data.length; i++) {
                var nd = $scope.data[i];
                nd.targets = nd.targets || [];
                 nd.targets = nd.targets.filter(function(item){
                     return item.id !== node.id;
                 });

            }
            resetNewNode();
        };
        function resetNewNode(){
            $scope.node = {};
            $scope.selected = '';
        }
        $scope.editNode = function(node){
            $scope.node = node;
            $scope.node.color = processFlowAttributeProvider.getColor($scope.node.state);
        };
        $scope.newNode = function(){
            $scope.node = {};
        }
        $scope.generateId=function(val){
            $scope.node.id = val?val.replace(' ','_').toLowerCase():'';
        }

        $scope.addChild = function(selected, direction){
            $scope.node.targets =  $scope.node.targets || [];
            $scope.node.color = processFlowAttributeProvider.getColor($scope.node.state);
            $scope.node.targets.push({'id':$scope.selected, 'direction':direction});
        };
        $scope.deleteChild = function(child){
            var index = $scope.node.targets.indexOf(child);
            if (index > -1) {
                $scope.node.targets.splice(index, 1);
            }
        };

        $scope.refreshDirective = function(){
            $scope.$broadcast('refreshProcessFlow');
        }
    }
})();
