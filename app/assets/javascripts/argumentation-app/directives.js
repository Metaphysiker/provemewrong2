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