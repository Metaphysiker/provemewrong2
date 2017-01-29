app = angular.module(
    'ArgumentationController');

app.directive('goDiagram', function() {
    return {
        restrict: 'E',
        template: '<div></div>',  // just an empty DIV element
        replace: true,
        scope: { model: '=goModel' },
        link: function(scope, element, attrs) {
            var $ = go.GraphObject.make;
            var diagram =  // create a Diagram for the given HTML DIV element
                $(go.Diagram, element[0],
                    {
                        nodeTemplate: $(go.Node, "Auto",
                            { locationSpot: go.Spot.Center },
                            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                            $(go.Shape, "RoundedRectangle", new go.Binding("fill", "color"),
                                {
                                    portId: "", cursor: "pointer",
                                    fromLinkable: true, toLinkable: true,
                                    fromLinkableSelfNode: true, toLinkableSelfNode: true,
                                    fromLinkableDuplicates: true, toLinkableDuplicates: true
                                }),
                            $(go.TextBlock, { margin: 3, editable: true },
                                new go.Binding("text", "name").makeTwoWay())
                        ),
                        linkTemplate: $(go.Link,
                            { relinkableFrom: true, relinkableTo: true },
                            $(go.Shape),
                            $(go.Shape, { toArrow: "OpenTriangle" })
                        ),
                        initialContentAlignment: go.Spot.Center,
                        "ModelChanged": updateAngular,
                        "ChangedSelection": updateSelection,
                        "undoManager.isEnabled": true
                    });
            // whenever a GoJS transaction has finished modifying the model, update all Angular bindings
            function updateAngular(e) {
                if (e.isTransactionFinished) {
                    scope.$apply();
                }
            }
            // update the Angular model when the Diagram.selection changes
            function updateSelection(e) {
                diagram.model.selectedNodeData = null;
                var it = diagram.selection.iterator;
                while (it.next()) {
                    var selnode = it.value;
                    // ignore a selected link or a deleted node
                    if (selnode instanceof go.Node && selnode.data !== null) {
                        diagram.model.selectedNodeData = selnode.data;
                        break;
                    }
                }
                scope.$apply();
            }
            // notice when the value of "model" changes: update the Diagram.model
            scope.$watch("model", function(newmodel) {
                var oldmodel = diagram.model;
                if (oldmodel !== newmodel) {
                    diagram.removeDiagramListener("ChangedSelection", updateSelection);
                    diagram.model = newmodel;
                    diagram.addDiagramListener("ChangedSelection", updateSelection);
                }
            });
            scope.$watch("model.selectedNodeData.name", function(newname) {
                if (!diagram.model.selectedNodeData) return;
                // disable recursive updates
                diagram.removeModelChangedListener(updateAngular);
                // change the name
                diagram.startTransaction("change name");
                // the data property has already been modified, so setDataProperty would have no effect
                var node = diagram.findNodeForData(diagram.model.selectedNodeData);
                if (node !== null) node.updateTargetBindings("name");
                diagram.commitTransaction("change name");
                // re-enable normal updates
                diagram.addModelChangedListener(updateAngular);
            });
        }
    };
})
    .controller('MinimalCtrl', ['$scope', '$http', function($scope, $http) {

        var centreArgumentation = {};
        var childArgumentation = {};

        $http({
            method: 'GET',
            url: '/argumentations/1.json',
            params: {id: 1}
        }).then(function successCallback(response) {
            centreArgumentation = response.data.title;
            console.log(centreArgumentation);
        });

        $http({
            method: 'GET',
            url: '/argumentations/2.json',
            params: {id: 2}
        }).then(function successCallback(response) {
            childArgumentation = response.data.title;
        });

        $scope.model = new go.GraphLinksModel(
            [
                { key: 1, name: centreArgumentation, color: "blue" },
                { key: 2, name: childArgumentation, color: "blue" }
            ],
            [
                { from: 1, to: 2 }
            ]);
        $scope.model.selectedNodeData = null;
        $scope.replaceModel = function() {
            $scope.model = new go.GraphLinksModel(
                [
                    { key: 1, name: centreArgumentation, color: "blue" },
                    { key: 2, name: childArgumentation, color: "blue" }
                ],
                [
                    { from: 1, to: 2 }
                ]);
        }
    }]);