app = angular.module(
    'ArgumentationController');

app.directive('searchArgumentation', function() {
    return {
        templateUrl: "argumentation/searchelements/searchargumentation.html",
        controller: "ArgumentationSearchController"
    };
});

app.directive('showArgumentation', function() {
    return {
        templateUrl: "argumentation/showelements/showargumentation.html",
        controller: "ArgumentationShowController"
    };
});