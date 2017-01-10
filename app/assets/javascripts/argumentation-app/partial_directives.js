app = angular.module(
    'ArgumentationController');

app.directive("viewArgumentationTop",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/view_elements/top.html"
    };

}]);

app.directive("viewArgumentationSidebar",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/view_elements/sidebar.html"
    };

}]);

app.directive("viewArgumentationArguments",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/view_elements/arguments.html"
    };

}]);

app.directive("loadingBar",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/loading_bar.html"
    };

}]);