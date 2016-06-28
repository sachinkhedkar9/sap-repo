/**
 * Created by nemade_g on 6/8/2016.
 */
(function() {
    'use strict';

    angular
        .module('guidedBuyingApp')
        .factory('ProcessNode', processNodeService);

    processNodeService.$inject = ['InnerNodeProvider'];

    function processNodeService(InnerNodeProvider) {

        //RETURNS OBJECT FOR FACTORY.
        var provider = function(svg, data, node) {
            this.svg = svg;

            this.data = data;
            if (!node || node.empty()) {
                this.node = svg.append('g')
                    .attr('id', function() {
                        return 'group-' + data.id;
                    }).selectAll('.nodes')
                    .data([data])
                    .enter()
                    .append('g')
                    .classed('nodes', true)
                    .classed(data.id, true)
                    .classed(data.state, true);

                this.node.append('circle')
                    .attr({
                        'r': 15,
                        'cx': 0,
                        'cy': 0,
                        'fill': 'none',
                        'stroke': function(d) {
                            var thisItem = d3.select(this);
                            var color = d.color;
                            // console.log('thisItem : ', thisItem);
                            // console.log('ths : ',this.parentNode);
                            // d3.select(this.parentNode).append('circle').attr({
                            //     // 'r': 10,
                            //     'r': 7,
                            //     'cx': thisItem.attr('cx'),
                            //     'cy': thisItem.attr('cy'),
                            //     'fill': color
                            // });
                            var innerNode =  new InnerNodeProvider(thisItem, this, data);
                            console.log('innerNode --> ', this);
                            // this.node.append(innerNode);
                            return color;
                        },
                        'stroke-width': '2px'
                    });

                    // var innerNode = new InnerNodeProvider(this.parentNode, data);
                    // this.node.append(innerNode);
                    // var innerNode =  new InnerNodeProvider(this.parentNode, data);
                    // console.log('innerNode --> ', innerNode);
                    // this.node.append(innerNode);

                this.node.append('text')
                    .attr({
                        'text-anchor': 'middle',
                        'y': 45
                    })
                    .text(function(d) {
                        return d.caption;
                    });
            } else {
                this.node = node;
            }
            this.children = {
                right: 0,
                up: 0,
                down: 0
            };
            this.joins = [];
            this.config = {
                horizontalDistance: 150,
                verticalDistance: 70
            };

            this.xy = {x:0};
        };

        function determineChildDirection() {
            var direction = 'right';
            if (this.children.right === 0) {
                // this.children.right = this.children.right + 1;
                // childNode.left = childNode.left + 1;

            } else if (this.children.up <= this.children.down) {
                direction = 'up';
                // this.children.down = this.children.down + 1;
                // childNode.up = childNode.up + 1;

            } else {
                direction = 'down';
                // this.children.up = this.children.up + 1;
                // childNode.down = childNode.down + 1;

            }
            return direction;
        }

        provider.prototype.setDimensions = function(height, width, margin) {
            this.dimensions = {
                height: height,
                width: width,
                margin: margin
            };
            //this.config.horizontalDistance = width / 10;

        };
        provider.prototype.setConfig = function(config) {
            this.config = config;
        };
        provider.prototype.addChild = function(node, direct) {
            var childNode = node || new provider(this.svg, node.data);
            var direction = direct || determineChildDirection.call(this, childNode);
            return this.addChildToDirection(direction, childNode);
        };
        provider.prototype.render = function(childNode, xyInfo, joiningline) {
            var isPositioned = childNode.node.attr('data-positioned');
              xyInfo.target.x = this.xy.x +this.config.horizontalDistance;
              childNode.xy.x = xyInfo.target.x;
              xyInfo.source.x = this.xy.x;
              // xyInfo = this.xyInfo;
            if (!isPositioned) {
                childNode.node.attr({
                    transform: function() {
                        return 'translate(' + xyInfo.target.x + ', ' + (xyInfo.target.y) + ')';
                    },
                    'data-positioned': 'true'
                });
            } else {
                var childTranslateInfo = d3.transform(childNode.node.attr('transform')).translate;
                xyInfo.target = {
                    x: childTranslateInfo[0],
                    y: childTranslateInfo[1]
                };

            }
            var diagonal = d3.svg.diagonal()
                .projection(function(d) {
                    return [d.y, d.x];
                });

            function getCombination(srcState, destState){
              return srcState + '-to-' + destState;
            }

            function getSrcState(state){
              return 'src-' + state;
            }

            function getDestState(state){
              return 'dest-' + state;
            }

            this.joins.push(joiningline);
              d3.select('.joinsGroup')


            .append('path')

            .attr(joiningline)
                .classed(getCombination(joiningline.data.sourceState, joiningline.data.targetState),true)
                .classed(getSrcState(joiningline.data.sourceState),true)
                .classed(getDestState(joiningline.data.targetState),true)
                .classed('joiningLine', true)
                .attr('d', function() {
                    var o = {
                        x: xyInfo.source.y,
                        y: xyInfo.source.x
                    };
                    var t = {
                        x: xyInfo.source.y,
                        y: xyInfo.source.x
                    };
                    return diagonal({
                        source: o,
                        target: t
                    });
                })
                .transition()
                .attr('d', function() {
                    var o = {
                        x: xyInfo.source.y,
                        y: xyInfo.source.x
                    };
                    var t = {
                        x: xyInfo.target.y,
                        y: xyInfo.target.x
                    };
                    return diagonal({
                        source: o,
                        target: t
                    });
                })
                .duration(500);
        };
        provider.prototype.addChildToDirection = function(direction, childNode) {
            var count = +this.children[direction] + 1;
            var x, y = 0;
            childNode.addedAtDirection = direction;
            var thisNodeTranslate = d3.transform(this.node.attr('transform')).translate;
            if (this.xyInfo) {
                thisNodeTranslate = [this.xyInfo.target.x, this.xyInfo.target.y];
            }
            var distanceFromBaseLine = (count || 1) * this.config.verticalDistance;
            if (direction === 'up') {
                y = thisNodeTranslate[1] - distanceFromBaseLine;
            } else if (direction === 'down') {
                y = thisNodeTranslate[1] + distanceFromBaseLine;
            } else {
                y = thisNodeTranslate[1];
            }
            this.children[direction] = this.children[direction] + 1;


            x = thisNodeTranslate[0] + this.config.horizontalDistance;
            var sourceNode = this;
            var xyInfo = {};

            xyInfo.source = {
                x: thisNodeTranslate[0],
                y: thisNodeTranslate[1]
            };
            xyInfo.target = {
                x: x,
                y: y
            };

            var joiningline = {
                stroke: sourceNode.data.color,
                'data': {
                    target: childNode.data.id,
                    source: sourceNode.data.id,
                    sourceState: sourceNode.data.state,
                    targetState: childNode.data.state
                }
            };

            childNode.xyInfo = xyInfo;
            this.childNodes = this.childNodes || [];
            this.childNodes.push({
                childNode: childNode,
                xyInfo: xyInfo,
                joiningLine: joiningline,
                direction: direction
            });
            //this.render(childNode,xyInfo, joiningline, direction);
            return childNode;
        };
        provider.prototype.renderAll = function() {
            if (this.childNodes) {
                this.childNodes.forEach(function(item) {
                    this.render(item.childNode, item.xyInfo, item.joiningLine, item.direction);
                }.bind(this));
            }
        };
        return provider;
    }
})();
