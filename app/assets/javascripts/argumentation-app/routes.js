angular.module(
    'ArgumentationController').config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider.when("/overview/",{
            templateUrl: "argumentation1/overview.html"
        }).when("/search",{
            controller: "mainArgumentationController",
            templateUrl: "argumentation1/search.html"
        }).when("/:id",{
            controller: "mainArgumentationController",
            templateUrl: "argumentation/show.html"
        }).when("/:id/edit",{
            controller: "mainArgumentationController",
            templateUrl: "argumentation/edit.html"
        });
    }
]);