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

app.directive('editArgumentation', function() {
    return {
        templateUrl: "argumentation/editelements/editargumentation.html",
        controller: "ArgumentationEditController"
    };
});

app.directive('compileTemplate', function($compile, $parse){
    return {
        link: function(scope, element, attr){
            var parsed = $parse(attr.ngBindHtml);
            function getStringValue() { return (parsed(scope) || '').toString(); }

            //Recompile if the template changes
            scope.$watch(getStringValue, function() {
                $compile(element, null, -9999)(scope);  //The -9999 makes it skip directives so that we do not recompile ourselves
            });
        }
    }
});