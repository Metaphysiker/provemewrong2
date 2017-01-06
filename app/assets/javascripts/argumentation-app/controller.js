var app = angular.module(
    'ArgumentationController',[
        'ngRoute',
        'templates',
        'ngAnimate'
    ]);

app.controller("MovingBlockController", ['$scope','$timeout', '$q', '$routeParams', function($scope, $timeout, $q, $routeParams){

    $scope.argumentationId =  $routeParams.id;
    $scope.startingposition = $routeParams.sp;
    $scope.loading = false;

    if ($scope.startingposition == undefined){
        $scope.movingBlock = 1;
    } else {
        $scope.movingBlock = $scope.startingposition;
    }

    $scope.test = "Test";
    $scope.addTimeOut = function(func, args, time) {
        return $q(function (resolve, reject) {
            setTimeout(function () {
                resolve(func(args));
            }, time);
        });
    };
}]);

app.controller("ArgumentationSearchController",['$scope', '$http', '$timeout', function($scope, $http, $timeout){
    //all variables
    $scope.page = 0;
    $scope.keywords = "";
    $scope.argumentations = [{title: "Please type in a word!"}];

    $scope.search = function(keywords, movingblock){

        $scope.loading = true;

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
            $scope.loading = false;
            $timeout(function () {
                $scope.movingBlock = movingblock;
            }, 700);

        });
    };

    $scope.previousPage = function() {
        if ($scope.page > 0) {
            $scope.movingBlock = 2;
            $scope.page = $scope.page - 1;
            $timeout(function () {
                $scope.search($scope.keywords, 3);
            }, 1000);
        }
    };

    $scope.nextPage = function() {
        $scope.movingBlock = 4;
        $scope.page = $scope.page + 1;
        $timeout(function () {
            $scope.search($scope.keywords, 5);
        }, 1000);
    };

}]);

app.controller("ArgumentationShowController", ['$scope','$http', '$timeout', function($scope, $http, $timeout){
    $scope.argumentations = {};
    $scope.loading = true;

    $http({
        method: 'GET',
        url: '/argumentations/' + $scope.argumentationId + '.json',
        params: {id: $scope.argumentationId}
    }).then(function successCallback(response) {
        $scope.argumentation = response.data;
        $scope.loading = false;
        $timeout(function () {
            $scope.movingBlock = $scope.startingposition + 1;
        }, 700);

    });

    $scope.getcontent = function(argument){
        $scope.argumentcontent = argument;
    };

}]);
