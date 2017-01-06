angular.module(
    'ArgumentationController').config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider.when("/overview/",{
            templateUrl: "argumentation/overview.html"
        }).when("/search",{
            controller: "MovingBlockController",
            templateUrl: "argumentation/search.html"
        });
    }
]);