var app = angular.module(
    'ArgumentationController',[
        'ngRoute',
        'templates',
        'ngAnimate',
        'ngSanitize',
        'pascalprecht.translate'
    ]);

app.controller("mainArgumentationController", ['$scope','$routeParams', '$translate', '$http', function($scope, $routeParams, $translate, $http){
    $scope.argumentationId =  $routeParams.id;
    $scope.startingposition = $routeParams.sp;
    $http.get("/getcurrentuser.json").then(function(data,status,headers,config) {
        $scope.userid = data.data;
   });
    $scope.loading = false;
    $scope.page = 0;
    $scope.keywords = "";
    $scope.oldkeywords = "";
    $scope.argumentations = [];
    $scope.highlightterm = "";
    $scope.argumentations = {};
    $scope.switchmode = false;
    $scope.deletemode = false;
    $scope.referencemode = false;
    $scope.selectedArguments = [];
    $scope.selectedArgumentToDestroy = "nothing";
    $scope.argumentcontent = {};
    $scope.pastable = "";

}]);

app.controller("MovingBlockController", ['$scope','$timeout', '$q', '$routeParams', '$location', function($scope, $timeout, $q, $routeParams, $location){

    $scope.argumentationId =  $routeParams.id;
    $scope.startingposition = $routeParams.sp;
    $scope.loading = false;

    if ($scope.startingposition == undefined){
        $scope.movingBlock = 1;
    } else {
        $scope.movingBlock = $scope.startingposition;
    }

    $scope.addTimeOut = function(func, args, time) {
        return $q(function (resolve, reject) {
            setTimeout(function () {
                resolve(func(args));
            }, time);
        });
    };

    $scope.goToArgumentation = function(argumentation_id,startingposition, leavingposition, edit){
        startingposition = startingposition || 1;
        edit = edit || false;
        leavingposition = leavingposition || 1;
        console.log($scope.movingBlock);
        $scope.movingBlock = leavingposition;
        console.log($scope.movingBlock);
        $timeout(function(){
            if (edit == true){
                $location.path("/" + argumentation_id + '/edit').search({"sp": startingposition});
            } else {
               $location.path("/" + argumentation_id).search({"sp": startingposition});
                //window.location.href = 'http://localhost:3000/argumentation#!/' + argumentation_id + '?sp=' + startingposition;
            }
        }, 1300);
    };


}]);

app.controller("ArgumentationSearchController",['$scope', '$http', '$timeout', '$sce', '$sanitize', function($scope, $http, $timeout, $sce, $sanitize){
    //all variables
    $scope.page = 0;
    $scope.keywords = "";
    $scope.argumentations = [{title: "Please type in a word!"}];
    $scope.highlightterm = "";

    $scope.search = function(keywords, movingblock){
        $scope.highlightterm = keywords;
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

    $scope.highlight = function(haystack, needle){
        haystack = $sanitize(haystack);
        if(!needle) {
            return $sce.trustAsHtml(haystack);
        }
        needle = needle.replace(/\s/g, "|");
        return $sce.trustAsHtml(haystack.replace(new RegExp(needle, "gi"), function(match) {
            return '<span class="highlightedText">' + match + '</span>';
        }));
    };

}]);

app.controller("ArgumentationShowController", ['$scope','$http', '$timeout', '$sce', '$sanitize', function($scope, $http, $timeout, $sce, $sanitize){
    $scope.argumentations = {};
    $scope.loading = true;
    $http({
        method: 'GET',
        url: '/argumentations/' + $scope.argumentationId + '.json',
        params: {id: $scope.argumentationId}
    }).then(function successCallback(response) {
        $scope.argumentation = response.data;
        $scope.argumentcontent = $scope.getnthargument(response.data, 1);
        $scope.loading = false;
        $timeout(function () {
            $scope.movingBlock = 1;
        }, 1300);

    });
    $scope.getcontent = function(argument){
        $scope.argumentcontent = argument;
    };

    $scope.getnthargument = function(argumentation, place){
        var firstargument = {};
        for (var i = 0; i < argumentation.arguments.length; i++) {
            if(argumentation.arguments[i].place == place) {
                firstargument = argumentation.arguments[i];
            }
        }
        return firstargument;
    };

    $scope.buttonmaker = function(haystack) {
        //needle = /argumentation1-link_to\((\d+)\)/i;
        needle = /argumentation-link_to\((\d+),\s([\w\sÀ-ž]+)\)/;
        haystack = haystack || "";

        haystack = $sanitize(haystack);
        //haystack = decodeURI(haystack);
        if(!needle) {
            return $sce.trustAsHtml(haystack);
        }
        //needle = needle.replace(/\s/g, "|");
        return $sce.trustAsHtml(haystack.replace(new RegExp(needle, "gi"), function(match) {
            return '<button ng-click="goToArgumentation(' +  needle.exec(match)[1] + ', 2, 4, false)" class="btn btn-md btn-info"> ' + needle.exec(match)[2] + '</button>'
        }));
    };
}]);


app.controller("ArgumentationEditController", ['$scope','$http', '$timeout', '$sce', function($scope, $http, $timeout, $sce){

    console.log($scope.movingBlock);
    $scope.switchmode = false;
    $scope.deletemode = false;
    $scope.selectedArguments = [];
    console.log($scope.movingBlock);

    $scope.save = function(){
        var currentplace = $scope.argumentcontent.place;
        if ($scope.form.$valid) {
            $http({
                method: 'PUT',
                url: '/argumentations/' + $scope.argumentationId + '.json',
                data:  $scope.argumentation
            }).then(function successCallback(response) {
                $scope.argumentation = response.data;
                $scope.argumentcontent = $scope.getnthargument(response.data, currentplace);
                $scope.form.$setPristine();
                $scope.form.$setUntouched();
            });
        }
    };

    $scope.addArgument = function(){
        console.log($scope.movingBlock);
        $scope.movingBlock = 4;
        console.log($scope.movingBlock);
        //var length = $scope.argumentation1.arguments.length;
        //$scope.argumentation1.arguments.push({title: "Lorem Ipsum", content: "Dolores Faceres esse aut", place: length + 1, id: 0});
        //$scope.argumentcontent = $scope.getnthargument($scope.argumentation1, length + 1);
        //$scope.form.$setDirty();
    };

    $scope.toggleSelectionForDeletion = function(argument){
        $scope.selectedArgumentToDestroy = argument;
    };

    $scope.destroyArgument = function(){
        var argument = $scope.selectedArgumentToDestroy;
        var index = $scope.argumentation.arguments.indexOf(argument);
        if (index > -1) {
            var place = argument.place;
            $scope.argumentation.arguments.splice(index, 1);
            $scope.reorder_place(place);
            $scope.argumentcontent = $scope.getnthargument($scope.argumentation, place);
            $scope.form.$setDirty();
        }
    };

    $scope.reorder_place = function(place){
        for (var i = 0; i < $scope.argumentation.arguments.length; i++) {
            if($scope.argumentation.arguments[i].place > place) {
              var currentplace = $scope.argumentation.arguments[i].place;
                $scope.argumentation.arguments[i].place = currentplace -1;
            }
        }

    };

    $scope.toggleSelectionForDeletion = function(argument){
        $scope.selectedArgumentToDestroy = argument;
    };

    $scope.toggleDeleteMode = function(){
        $scope.switchmode = false;
        if($scope.deletemode == false){
            $scope.deletemode = true;
        } else {
            $scope.deletemode = false;
        }
    };

    $scope.toggleSwitchMode = function(){
        $scope.deletemode = false;
        if($scope.switchmode == false){
            $scope.switchmode = true;
        } else {
            $scope.switchmode = false;
        }
    };

    $scope.switcharguments = function (){

        var first_argument = {};
        var first_argument = $scope.selectedArguments[0];
        var second_argument = $scope.selectedArguments[1];

        var first_place = first_argument.place;
        var second_place = second_argument.place;

        first_argument.place = second_place;
        second_argument.place = first_place;

        $scope.selectedArguments = [];

        $scope.form.$setDirty();
    };

    $scope.toggleSelection = function(argument){
        var idx = $scope.selectedArguments.indexOf(argument);

        // is currently selected
        if (idx > -1) {
            $scope.selectedArguments.splice(idx, 1);
        }

        // is newly selected
        else {
            if($scope.selectedArguments.length > 1){
                $scope.selectedArguments.splice(0, 1);
                $scope.selectedArguments.push(argument);
            } else {
                $scope.selectedArguments.push(argument);
            }
        }
    };


}]);