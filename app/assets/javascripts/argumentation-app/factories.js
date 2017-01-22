app = angular.module(
    'ArgumentationController');

app.factory('railsSanitizer', ['$location', '$http', function($location, $http) {
    return{
        getPreview: function(text, scopevariable) {
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
        }
    }
}]);