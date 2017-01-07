angular.module(
    'ArgumentationController').config([
    "$routeProvider",
    function($routeProvider) {
        $routeProvider.when("/overview/",{
            templateUrl: "argumentation/overview.html"
        }).when("/search",{
            controller: "MovingBlockController",
            templateUrl: "argumentation/search.html"
        }).when("/:id",{
            controller: "MovingBlockController",
            templateUrl: "argumentation/show.html"
        }).when("/:id/edit",{
            controller: "MovingBlockController",
            templateUrl: "argumentation/edit.html"
        });
    }
]);