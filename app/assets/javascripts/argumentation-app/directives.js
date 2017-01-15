app = angular.module(
    'ArgumentationController');

app.directive('searchArgumentation', function() {
    return {
        templateUrl: "argumentation1/searchelements/searchargumentation.html",
        controller: "ArgumentationSearchController"
    };
});

app.directive('showArgumentation', function() {
    return {
        templateUrl: "argumentation1/showelements/showargumentation.html",
        controller: "ArgumentationShowController"
    };
});

app.directive('editArgumentation', function() {
    return {
        templateUrl: "argumentation1/editelements/editargumentation.html",
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

app.directive("goToArgumentationButton",['$location', '$timeout', function($location,$timeout){

    return {
        restrict: 'E',
        link: function(scope, element, attr)
        {
            scope.alertbody = function()
            {
                console.log("First log: " + scope.movingBlock);
                //window.location.href = 'http://localhost:3000/argumentation#!/80';

                scope.$parent.movingBlock = 2;

                console.log("Second log: " + scope.movingBlock);

                //$timeout(function(){
                //    $location.path("/" + 80).search({"sp": 2});
                //}, 1300);

            }

        },
        templateUrl:"argumentation1/showelements/gotoargumentation.html"

    };

}]);



app.directive("getArgumentation",['$location','$http', '$timeout', '$sce', '$sanitize', function($location, $http, $timeout, $sce, $sanitize){

    return {
        link: function(scope, element, attr)
        {
            if (scope.startingposition == undefined){
                scope.movingBlock = 1;
            } else {
                scope.movingBlock = scope.startingposition;
            }

            if(/edit/.test($location.$$path)){
                scope.environment = "edit";
            } else {
                scope.environment = "show";
            }

            scope.loading = true;

            $http({
                method: 'GET',
                url: '/argumentations/' + scope.argumentationId + '.json',
                params: {id: scope.argumentationId}
            }).then(function successCallback(response) {
                scope.argumentation = response.data;
                scope.argumentcontent = scope.getnthargument(response.data, 1);
               // scope.argumentcontent = scope.argumentation.arguments[0];
                scope.loading = false;
                $timeout(function () {
                    scope.movingBlock = 1;
                }, 1300);

            });

            scope.getcontent = function(argument){
                scope.argumentcontent = argument;
            };

            scope.getnthargument = function(argumentation, place){
                var nthargument = {};
                for (var i = 0; i < argumentation.arguments.length; i++) {
                    if(argumentation.arguments[i].place == place) {
                        nthargument = argumentation.arguments[i];
                    }
                }
                return nthargument;
            };

            scope.goToArgumentation = function(argumentation_id,startingposition, leavingposition, edit){
                startingposition = startingposition || 1;
                edit = edit || false;
                leavingposition = leavingposition || 1;
                scope.movingBlock = leavingposition;
                $timeout(function(){
                    if (edit == true){
                        $location.path("/" + argumentation_id + '/edit').search({"sp": startingposition});
                    } else {
                        $location.path("/" + argumentation_id).search({"sp": startingposition});
                        //window.location.href = 'http://localhost:3000/argumentation#!/' + argumentation_id + '?sp=' + startingposition;
                    }
                }, 1300);
            };

        }
    };
}]);

app.directive("getArgumentations",['$location','$http', '$timeout', '$sce', '$routeParams', function($location, $http, $timeout, $sce,$routeParams){

    return {
        link: function(scope, element, attr)
        {

            scope.search = function(keywords, direction){
                scope.highlightterm = keywords;
                scope.loading = true;
                if (scope.keywords != scope.oldkeywords){
                    scope.page = 0;
                    scope.oldkeywords = scope.keywords
                }

                $http({
                    method: 'POST',
                    url: '/search.json',
                    params: {keywords: scope.keywords, page: scope.page}
                }).then(function successCallback(response) {
                    scope.argumentations = response.data;
                    scope.loading = false;
                    $timeout(function () {
                        scope.movingBlock = direction;
                    }, 700);

                });
            };

            scope.previousPage = function() {
                if (scope.page > 0) {
                    scope.movingBlock = 2;
                    scope.page = scope.page - 1;
                    $timeout(function () {
                        scope.search(scope.keywords, 5);
                    }, 1000);
                }
            };

            scope.nextPage = function() {
                scope.movingBlock = 3;
                scope.page = scope.page + 1;
                $timeout(function () {
                    scope.search(scope.keywords, 4);
                }, 1000);
            };

            scope.highlight = function(haystack, needle){
                if(!needle) {
                    return $sce.trustAsHtml(haystack);
                }
                needle = needle.replace(/\s/g, "|");
                return $sce.trustAsHtml(haystack.replace(new RegExp(needle, "gi"), function(match) {
                    return '<span class="highlightedText">' + match + '</span>';
                }));
            };

            var navsearchterms = $routeParams.navsearchterms;
            if(navsearchterms != undefined){
                scope.keywords = navsearchterms;
                scope.search(navsearchterms);
                navsearchterms = undefined;
            }
        }
    };
}]);

app.directive("getEditMethods",['$location','$http', '$filter', '$timeout', function($location, $http, $filter, $timeout){

    return {
        link: function(scope, element, attr)
        {
            scope.$on('$locationChangeStart', function(event, next, current) {
                if (scope.form.$dirty) {
                    var newPath = $location.path();
                    var searchObject = $location.search();
                    var movBlockNow = scope.movingBlock;
                    event.preventDefault();
                    scope.movingBlock = 1;

                    var title = $filter('translate')('UNSAVED_CHANGES');
                    var text = $filter('translate')('UNSAVED_CHANGES_COMMENT');
                    var confirm = $filter('translate')('UNSAVED_CHANGES_CONFIRM');
                    var cancel = $filter('translate')('BACK');

                    swal({
                            title: title,
                            text: text,
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: confirm,
                            cancelButtonText: cancel,
                            closeOnConfirm: true
                        },
                        function(){
                            swal({
                                title: "Changes have been removed!",
                                text: "",
                                timer: 1000,
                                showConfirmButton: false
                            });
                            scope.$apply(function() {
                                scope.movingBlock = movBlockNow;
                                scope.form.$setPristine();
                                scope.form.$setUntouched();
                                $timeout(function () {
                                    $location.path(newPath).search(searchObject);
                                }, 1300);
                            });
                        });
                }
            });

            scope.save = function(){
                var currentplace = scope.argumentcontent.place;
                if (scope.form.$valid) {
                    $http({
                        method: 'PUT',
                        url: '/argumentations/' + scope.argumentationId + '.json',
                        data:  scope.argumentation
                    }).then(function successCallback(response) {
                        var swalmessage = $filter('translate')('SAVED');
                        swal( swalmessage, "", "success");
                        scope.argumentation = response.data;
                        scope.argumentcontent = scope.getnthargument(response.data, currentplace);
                        scope.form.$setPristine();
                        scope.form.$setUntouched();
                    });
                }
            };

            scope.addReferenceToArgumentation = function(){

            };

            scope.addArgument = function(){

                var swalmessage = $filter('translate')('ADDED_ARGUMENT');
                swal( swalmessage, "", "success");
                var length = scope.argumentation.arguments.length;
                scope.argumentation.arguments.push({title: "Lorem Ipsum", content: "Dolores Faceres esse aut", place: length + 1, id: 0});
                scope.argumentcontent = scope.getnthargument(scope.argumentation, length + 1);
                scope.form.$setDirty();
            };

            scope.toggleSelectionForDeletion = function(argument){
                scope.selectedArgumentToDestroy = argument;
            };

            scope.destroyArgument = function(){

                var title = $filter('translate')('DELETE_ALERT_TITLE');
                var text = $filter('translate')('DELETE_ALERT_TEXT');
                var confirm = $filter('translate')('DELETE_ALERT_CONFIRM');
                var cancel = $filter('translate')('DELETE_ALERT_CANCEL');
                var message = $filter('translate')('DELETE_ALERT_DELETED');

                var argument = scope.selectedArgumentToDestroy;
                var index = scope.argumentation.arguments.indexOf(argument);

                swal({
                        title: title,
                        text: text,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: confirm,
                        cancelButtonText: cancel,
                        closeOnConfirm: false
                    },
                    function(){
                        swal(message, "", "success");
                        scope.$apply(function () {
                            if (index > -1) {
                                var place = argument.place;
                                scope.argumentation.arguments.splice(index, 1);
                                scope.reorder_place(place);
                                scope.argumentcontent = scope.getnthargument(scope.argumentation, 1);
                                scope.form.$setDirty();
                                scope.deletemode = false;
                                scope.selectedArgumentToDestroy = "nothing";
                            }
                        });

                    });

            };

            scope.reorder_place = function(place){
                for (var i = 0; i < scope.argumentation.arguments.length; i++) {
                    if(scope.argumentation.arguments[i].place > place) {
                        var currentplace = scope.argumentation.arguments[i].place;
                        scope.argumentation.arguments[i].place = currentplace -1;
                    }
                }

            };

            scope.toggleSelectionForDeletion = function(argument){
                scope.selectedArgumentToDestroy = argument;
            };

            scope.toggleDeleteMode = function(){
                scope.switchmode = false;
                if(scope.deletemode == false){
                    scope.deletemode = true;
                } else {
                    scope.deletemode = false;
                }
            };

            scope.toggleSwitchMode = function(){
                scope.deletemode = false;
                if(scope.switchmode == false){
                    scope.switchmode = true;
                } else {
                    scope.switchmode = false;
                }
            };

            scope.switcharguments = function (){

                var first_argument = {};
                var first_argument = scope.selectedArguments[0];
                var second_argument = scope.selectedArguments[1];

                var first_place = first_argument.place;
                var second_place = second_argument.place;

                first_argument.place = second_place;
                second_argument.place = first_place;

                scope.selectedArguments = [];

                scope.form.$setDirty();
            };

            scope.toggleSelection = function(argument){
                var idx = scope.selectedArguments.indexOf(argument);

                // is currently selected
                if (idx > -1) {
                    scope.selectedArguments.splice(idx, 1);
                }

                // is newly selected
                else {
                    if(scope.selectedArguments.length > 1){
                        scope.selectedArguments.splice(0, 1);
                        scope.selectedArguments.push(argument);
                    } else {
                        scope.selectedArguments.push(argument);
                    }
                }
            };

        }
    };
}]);

app.directive("getGoToArgumentationMethod",['$location','$http', '$timeout', function($location, $http, $timeout){

    return {
        link: function(scope, element, attr)
        {

            scope.goToArgumentation = function(argumentation_id,startingposition, leavingposition, edit){
                startingposition = startingposition || 1;
                edit = edit || false;
                leavingposition = leavingposition || 1;
                scope.movingBlock = leavingposition;
                $timeout(function(){
                    if (edit == true){
                        $location.path("/" + argumentation_id + '/edit').search({"sp": startingposition});
                    } else {
                        $location.path("/" + argumentation_id).search({"sp": startingposition});
                    }
                }, 1300);
            };

            scope.goToOverview = function(startingposition, leavingposition){
                startingposition = startingposition || 1;
                leavingposition = leavingposition || 1;
                scope.movingBlock = leavingposition;
                $timeout(function(){
                    $location.path("/overview").search({"sp": startingposition});
                }, 1300);
            };
        }
    };
}]);

app.directive("changeLanguageButton",['$location', '$timeout', '$translate', function($location,$timeout, $translate){

    return {
        restrict: 'E',
        link: function(scope, element, attr)
        {

            scope.changeLanguage = function (key) {
                $translate.use(key);
            };

        },
        templateUrl:"argumentation/change_language_button.html"

    };

}]);

app.directive("myArgumentations",['$location', '$timeout', '$http', '$filter', function($location,$timeout, $http, $filter){

    return {
        link: function(scope, element, attr)
        {
            if (scope.startingposition == undefined){
                scope.movingBlock = 1;
            } else {
                scope.movingBlock = scope.startingposition;
            }

            scope.getMyArgumentations = function(){
                $http({
                    method: 'GET',
                    url: '/myargumentations.json'
                }).then(function successCallback(response) {
                    scope.argumentations = response.data;
                    scope.loading = false;
                    $timeout(function () {
                        scope.movingBlock = 1;
                    }, 700);

                });
            };

            scope.getMyArgumentations();

            scope.createArgumentation = function(){
                $http({
                    method: 'POST',
                    url: '/argumentations.json'
                }).then(function successCallback(response) {
                    var id = response.data.id;
                    console.log(id);
                    scope.movingBlock = 2;
                    $timeout(function () {
                        $location.path("/" + id + '/edit').search({"sp": 3});
                    }, 1300);
                });
            };

            scope.deleteArgumentation = function(id){

                var title = $filter('translate')('DELETE_ALERT_TITLE');
                var text = $filter('translate')('DELETE_ARGUMENTATION_ALERT_TEXT');
                var confirm = $filter('translate')('DELETE_ALERT_CONFIRM');
                var message = $filter('translate')('DELETE_ARGUMENTATION_ALERT_DELETED');

            swal({
                    title: title,
                    text: text,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirm,
                    closeOnConfirm: false
                },
                function(){
                    swal(message, "", "success");
                    scope.$apply(function () {
                        $http({
                            method: 'POST',
                            url: '/destroyargumentation.json',
                            data: {id: id}
                        }).then(function successCallback(response) {
                            scope.getMyArgumentations();
                        });
                    });
                });
            };

        },
        templateUrl:"argumentation/my_argumentations.html"
    };

}]);
