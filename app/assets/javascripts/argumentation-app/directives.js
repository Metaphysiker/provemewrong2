app = angular.module(
    'ArgumentationController');

app.directive('searchArgumentation', function() {
    return {
        templateUrl: "argumentation/searchargumentation.html",
        controller: "ArgumentationSearchController"
    };
});