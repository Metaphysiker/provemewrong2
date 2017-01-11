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

app.directive("argumentationContent",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/view_elements/argumentation_content.html"
    };

}]);

app.directive("argumentContentContent",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/view_elements/argument_content_content.html"
    };

}]);

app.directive("editArgumentationTop",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/edit_elements/top.html"
    };

}]);

app.directive("editArgumentationSidebar",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/edit_elements/sidebar.html"
    };

}]);

app.directive("editArgumentationArguments",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/edit_elements/arguments.html"
    };

}]);

app.directive("searchForm",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/search_elements/form.html"
    };

}]);

app.directive("searchNav",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/search_elements/nav.html"
    };

}]);

app.directive("searchResults",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/search_elements/results.html"
    };

}]);

app.directive("userPanel",['$location', '$timeout', function($location,$timeout){

    return {
        templateUrl:"argumentation/user_panel.html"
    };

}]);
