var app = angular.module(
    'ArgumentationController',[
        'ngRoute',
        'templates'
    ]);

app.controller("ArgumentationSearchController",['$scope', function($scope){
    $scope.argumentations = {title: "echo", content: "content"};
}]);
