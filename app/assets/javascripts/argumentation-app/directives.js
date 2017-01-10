app = angular.module(
    'ArgumentationController');

app.directive('searchArgumentation', function() {
    return {
        templateUrl: "argumentation1/searchelements/searchargumentation.html",
        controller: "ArgumentationSearchController"
    };
});

app.directive('showArgumentation', function() {
    return {
        templateUrl: "argumentation1/showelements/showargumentation.html",
        controller: "ArgumentationShowController"
    };
});

app.directive('editArgumentation', function() {
    return {
        templateUrl: "argumentation1/editelements/editargumentation.html",
        controller: "ArgumentationEditController"
    };
});

app.directive('compileTemplate', function($compile, $parse){
    return {
        link: function(scope, element, attr){
            var parsed = $parse(attr.ngBindHtml);
            function getStringValue() { return (parsed(scope) || '').toString(); }

            //Recompile if the template changes
            scope.$watch(getStringValue, function() {
                $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
            });
        }
    }
});

app.directive("goToArgumentationButton",['$location', '$timeout', function($location,$timeout){

    return {
        restrict: 'E',
        link: function(scope, element, attr)
        {
            scope.alertbody = function()
            {
                console.log("First log: " + scope.movingBlock);
                //window.location.href = 'http://localhost:3000/argumentation#!/80';

                scope.$parent.movingBlock = 2;

                console.log("Second log: " + scope.movingBlock);

                //$timeout(function(){
                //    $location.path("/" + 80).search({"sp": 2});
                //}, 1300);

            }

        },
        templateUrl:"argumentation1/showelements/gotoargumentation.html"

    };

}]);



app.directive("getArgumentation",['$location','$http', '$timeout', function($location, $http, $timeout){

    return {
        link: function(scope, element, attr)
        {
            if (scope.startingposition == undefined){
                scope.movingBlock = 1;
            } else {
                scope.movingBlock = scope.startingposition;
            }

            scope.loading = true;

            $http({
                method: 'GET',
                url: '/argumentations/' + scope.argumentationId + '.json',
                params: {id: scope.argumentationId}
            }).then(function successCallback(response) {
                scope.argumentation = response.data;
                scope.argumentcontent = scope.getnthargument(response.data, 1);
               // scope.argumentcontent = scope.argumentation.arguments[0];
                scope.loading = false;
                $timeout(function () {
                    scope.movingBlock = 1;
                }, 1300);

            });

            scope.getcontent = function(argument){
                scope.argumentcontent = argument;
            };

            scope.getnthargument = function(argumentation, place){
                var nthargument = {};
                for (var i = 0; i < argumentation.arguments.length; i++) {
                    if(argumentation.arguments[i].place == place) {
                        nthargument = argumentation.arguments[i];
                    }
                }
                return nthargument;
            };
        }
    };
}]);

app.directive("getEditMethods",['$location','$http', function($location, $http){

    return {
        link: function(scope, element, attr)
        {

            scope.save = function(){
                var currentplace = scope.argumentcontent.place;
                if (scope.form.$valid) {
                    $http({
                        method: 'PUT',
                        url: '/argumentations/' + scope.argumentationId + '.json',
                        data:  scope.argumentation
                    }).then(function successCallback(response) {
                        scope.argumentation = response.data;
                        scope.argumentcontent = scope.getnthargument(response.data, currentplace);
                        scope.form.$setPristine();
                        scope.form.$setUntouched();
                    });
                }
            };

            scope.addArgument = function(){
                var length = scope.argumentation.arguments.length;
                scope.argumentation.arguments.push({title: "Lorem Ipsum", content: "Dolores Faceres esse aut", place: length + 1, id: 0});
                scope.argumentcontent = scope.getnthargument(scope.argumentation, length + 1);
                scope.form.$setDirty();
            };

            scope.toggleSelectionForDeletion = function(argument){
                scope.selectedArgumentToDestroy = argument;
            };

            scope.destroyArgument = function(){
                var argument = scope.selectedArgumentToDestroy;
                var index = scope.argumentation.arguments.indexOf(argument);
                if (index > -1) {
                    var place = argument.place;
                    scope.argumentation.arguments.splice(index, 1);
                    scope.reorder_place(place);
                    scope.argumentcontent = scope.getnthargument(scope.argumentation, place);
                    scope.form.$setDirty();
                }
            };

            scope.reorder_place = function(place){
                for (var i = 0; i < scope.argumentation.arguments.length; i++) {
                    if(scope.argumentation.arguments[i].place > place) {
                        var currentplace = scope.argumentation.arguments[i].place;
                        scope.argumentation.arguments[i].place = currentplace -1;
                    }
                }

            };

            scope.toggleSelectionForDeletion = function(argument){
                scope.selectedArgumentToDestroy = argument;
            };

            scope.toggleDeleteMode = function(){
                scope.switchmode = false;
                if(scope.deletemode == false){
                    scope.deletemode = true;
                } else {
                    scope.deletemode = false;
                }
            };

            scope.toggleSwitchMode = function(){
                scope.deletemode = false;
                if(scope.switchmode == false){
                    scope.switchmode = true;
                } else {
                    scope.switchmode = false;
                }
            };

            scope.switcharguments = function (){

                var first_argument = {};
                var first_argument = scope.selectedArguments[0];
                var second_argument = scope.selectedArguments[1];

                var first_place = first_argument.place;
                var second_place = second_argument.place;

                first_argument.place = second_place;
                second_argument.place = first_place;

                scope.selectedArguments = [];

                scope.form.$setDirty();
            };

            scope.toggleSelection = function(argument){
                var idx = scope.selectedArguments.indexOf(argument);

                // is currently selected
                if (idx > -1) {
                    scope.selectedArguments.splice(idx, 1);
                }

                // is newly selected
                else {
                    if(scope.selectedArguments.length > 1){
                        scope.selectedArguments.splice(0, 1);
                        scope.selectedArguments.push(argument);
                    } else {
                        scope.selectedArguments.push(argument);
                    }
                }
            };

        }
    };
}]);