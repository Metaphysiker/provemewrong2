angular.module(
    'ArgumentationController').config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider.when("/overview/",{
            controller: "mainArgumentationController",
            templateUrl: "argumentation/overview.html"
        }).when("/search",{
            controller: "mainArgumentationController",
            templateUrl: "argumentation/search.html"
        }).when("/:id",{
            controller: "mainArgumentationController",
            templateUrl: "argumentation/show.html"
        }).when("/:id/edit",{
            controller: "mainArgumentationController",
            templateUrl: "argumentation/edit.html"
        });
    }
]);