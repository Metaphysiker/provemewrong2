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

app.directive("navBar",['$location', '$timeout', '$http', '$window', function($location,$timeout, $http, $window){

    return {
        link: function(scope, element, attr)
        {
            scope.searchnav = function(searchterms){
                $location.path("/search").search({"navsearchterms": searchterms});
            };

            scope.logout = function(){
                $http({
                    method: 'GET',
                    url: '/logout'
                }).then(function successCallback(response) {
                    console.log(response);
                    $window.location.reload();
                    $location.path("/start");
                });

            };

        },
        templateUrl:"nav_bar.html"
    };

}]);


app.directive("myComments",['$location', '$timeout', '$http', '$window', function($location,$timeout, $http, $window){

    return {
        link: function(scope, element, attr)
        {
            scope.getMyComments = function(){
                $http({
                    method: 'GET',
                    url: '/getmycomments.json'
                }).then(function successCallback(response) {
                    scope.comments = response.data;
                });
            };

            scope.getMyComments();
        },
        templateUrl:"argumentation/my_comments.html"
    };

}]);

app.directive("searchForArgumentation",['$location', '$timeout', '$http', function($location,$timeout, $http){

    return {
        link: function(scope, element, attr)
        {

            scope.waitingForArgumentations = false;
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
                if (keywords.length > 3){
                    scope.waitingForArgumentations = true;
                    if(keywords.length > 3){
                        $http({
                            method: 'POST',
                            url: '/searchtitle.json',
                            params: {keywords: keywords}
                        }).then(function successCallback(response) {
                            scope.waitingForArgumentations = false;
                            scope.argumentations = response.data;
                        });
                    }
                }
            };

            scope.createPastable = function(argumentation){
                //scope.pastable = "hyperlink(" + argumentation.id + ":" + (argumentation.title).replace(/\.|\!|\?|:|,/g,'') + ")";
                scope.pastable = "hyperlink(" + argumentation.id + ':"' + argumentation.title + '"#)';
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
            scope.argumentcomment = "";
            scope.argumentcommentpreview = "";

            scope.createComment = function(title, content, argument){
                $http({
                    method: 'POST',
                    url: '/argument_comments.json',
                    params:  {title: title,
                                content: content,
                                argument_id: argument.id}
                }).then(function successCallback(response) {
                    scope.argumentcommentpreview = "";
                    scope.argumentcomment = "";
                    scope.argumentcommenttitlepreview = "";
                    scope.getcomments(argument);
                });
            };

            scope.getPreview = function(text, scopevariable){
                $http({
                    method: 'GET',
                    url: 'sanitizepreview.json',
                    params:  {text: text}
                }).then(function successCallback(response) {
                    if(scopevariable == "argumentationcontentpreview"){
                        scope.argumentationcontentpreview = response.data.clean;
                    } else if(scopevariable == "argumentcontentpreview") {
                        scope.argumentcontentpreview = response.data.clean;
                    } else if(scopevariable == "argumentcommentpreview") {
                        scope.argumentcommentpreview = response.data.clean;
                    }
                });
            };
        },
        templateUrl:"argumentation/view_elements/argument_comments.html"
    };

}]);