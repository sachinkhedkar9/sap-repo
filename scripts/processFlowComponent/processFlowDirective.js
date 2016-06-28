/**
 * Created by nemade_g on 6/8/2016.
 */
(function () {
    'use strict';
    angular
        .module('guidedBuyingApp')
        .directive('processFlowDirective', processFlowDirective);
    processFlowDirective.$inject = ['ProcessNode']
    function processFlowDirective(ProcessNode) {
        var directive = {
            restrict: 'AE',
            template: '<div style="margin-top:50px"><div class="svgContainer"></div></div>',
            scope: {
                data:'='
            },
            link: processFlowDirectiveLink

        };

        return directive;

        function processFlowDirectiveLink(scope, el, attr, ctrl) {
            //link function of directive
            // scope.$watchCollection('data', function (newValue, oldValue) {
            var margin = {};
            var width, height;
            scope.rightCount = 0;
            var config = {};
            // var winWidth = $('process-flow-directive').parent().width();
            var svgContainer = el[0].querySelector('.svgContainer');
            var processNodeObjects = {};
               calculateSpacing();
               renderNodes();
            // });
            scope.$on('refreshProcessFlow', function(){
                calculateSpacing();
                renderNodes();
            })
            window.addEventListener('resize',function(){
                calculateSpacing();
                renderNodes();
            });

            function getCurrentWidth(){
              return el.parent()[0].offsetWidth;
            }

            function updateDimensions(winWidth) {
                margin.top = 20;
                margin.right = 100;
                margin.left = 50;
                margin.bottom = 50;

                width = winWidth - margin.left - margin.right;
                config = {
                    horizontalDistance:  (width / scope.rightCount) || 10,
                    verticalDistance:70
                }
                height = 500 - margin.top - margin.bottom;
            }
            function calculateSpacing(){
                updateDimensions(getCurrentWidth());
                scope.rightCount = 0;
                // el.html('');

                d3.select(svgContainer).selectAll("*").remove();
                var parentSvg = d3.select(svgContainer).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append('g').classed('mainGrp',true)
                    .attr("transform", "translate(" + margin.left + "," + height /2 + ")");

                var linesGroup = parentSvg.append('g').classed('joinsGroup',true);

                var svg = parentSvg
                    .append("g")

                scope.data.forEach(function(item,index){
                    var pNode = new ProcessNode(svg, item);
                    pNode.setConfig(config);
                    pNode.setDimensions(height, width, margin);
                    processNodeObjects[item.id] = pNode;
                });
                scope.data.forEach(function(item,index){

                    if(item.targets) {
                        item.targets.forEach(function (target, ind) {
                         var child =  processNodeObjects[item.id].addChild(processNodeObjects[target.id], target.direction);
                            var tr = d3.transform(child.node.attr('transform')).translate;
                            if(child.xyInfo){
                                tr = [child.xyInfo.target.x, child.xyInfo.target.y];
                            }
                            if(tr[1] === 0 && child.addedAtDirection === 'right'){
                                scope.rightCount = scope.rightCount + 1;
                            }
                        });
                    }
                });
            }

            function renderNodes(){
                updateDimensions(getCurrentWidth());

                scope.data.forEach(function(item,index){
                  var pNode = processNodeObjects[item.id];
                  pNode.setConfig(config);
                  pNode.setDimensions(height, width, margin);
                  pNode.renderAll();
                });
            }
        }
    }
})();
