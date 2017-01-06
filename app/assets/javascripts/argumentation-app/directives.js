app = angular.module(
    'ArgumentationController');

app.directive('myArgumentations', function() {
    return {
        templateUrl: "argumentation/myargumentations.html",
        controller: "MyArgumentationShowController"
    };
});