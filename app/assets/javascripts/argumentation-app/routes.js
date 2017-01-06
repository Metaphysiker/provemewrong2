angular.module(
    'ArgumentationController').config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider.when("/overview/",{
            templateUrl: "argumentation/overview.html"
        }).when("/search",{
            controller: "ArgumentationSearchController",
            templateUrl: "argumentation/search.html"
        });
    }
]);