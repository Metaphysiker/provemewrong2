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

app.directive("navBar",['$location', '$timeout', function($location,$timeout){

    return {
        link: function(scope, element, attr)
        {
            scope.searchnav = function(searchterms){
                $location.path("/search").search({"navsearchterms": searchterms});
            }

        },
        templateUrl:"nav_bar.html"
    };

}]);

app.directive("searchForArgumentation",['$location', '$timeout', '$http', function($location,$timeout, $http){

    return {
        link: function(scope, element, attr)
        {
            scope.addReference = function(){
                if (scope.referencemode == false){
                    scope.referencemode = true;
                } else {
                    scope.referencemode = false;
                    scope.pastable = "";
                    scope.argumentations = {};
                }
            };

            scope.searchargumentationbytitle = function(keywords){

                if(keywords.length > 3){
                    $http({
                        method: 'POST',
                        url: '/searchtitle.json',
                        params: {keywords: keywords}
                    }).then(function successCallback(response) {
                        scope.argumentations = response.data;
                    });
                }
            };

            scope.createPastable = function(argumentation){
                //scope.pastable = "hyperlink(" + argumentation.id + ":" + (argumentation.title).replace(/\.|\!|\?|:|,/g,'') + ")";
                scope.pastable = "hyperlink(" + argumentation.id + ":" + argumentation.title + ")";
                console.log(scope.pastable);
            };

        },
        templateUrl:"argumentation/edit_elements/search_for_argumentation.html"
    };

}]);

app.directive("argumentComments",['$location', '$timeout', '$http', function($location,$timeout, $http){

    return {
        link: function(scope, element, attr)
        {

        },
        templateUrl:"argumentation/view_elements/argument_comments.html"
    };

}]);