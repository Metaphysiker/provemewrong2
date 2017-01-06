var app = angular.module(
    'ArgumentationController',[
        'ngRoute',
        'templates'
    ]);

app.controller("MovingBlockController", ['$scope', function($scope){
    $scope.movingBlock = 1;
    $scope.test = "Test";
    $scope.moveBlock = function(){
        $scope.movingBlock = 2;
    };
}]);

app.controller("ArgumentationSearchController",['$scope', function($scope){
    $scope.argumentations = {title: "echo", content: "content"};
}]);
