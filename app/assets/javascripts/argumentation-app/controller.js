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

app.controller("ArgumentationSearchController",['$scope', '$http', function($scope, $http){
    //all variables
    $scope.page = 0;
    $scope.keywords = "";
    $scope.argumentations = [{title: "Please type in a word!"}];

    $scope.search = function(keywords){

        if (keywords != $scope.keywords){
            $scope.page = 0;
        }
        $scope.keywords = keywords;

        $http({
            method: 'POST',
            url: '/search.json',
            params: {keywords: $scope.keywords, page: $scope.page}
        }).then(function successCallback(response) {
            $scope.argumentations = response.data;
        });
    };

    $scope.previousPage = function() {
        if ($scope.page > 0) {
            $scope.page = $scope.page - 1;
            $scope.search($scope.keywords);
        }
    };

    $scope.nextPage = function() {
        $scope.page = $scope.page + 1;
        $scope.search($scope.keywords);
    };


}]);
