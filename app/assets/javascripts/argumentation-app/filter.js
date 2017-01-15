app = angular.module(
    'ArgumentationController');

app.filter('buttonMaker',['$sce', '$sanitize', function($sce, $sanitize) {
    return function(input) {
        input = input || '';

        needle = /hyperlink\((\d+)\:([\w\sÀ-ž]+)\)/gi;
        needlewo = /hyperlink\((\d+)\:([\w\sÀ-ž]+)\)/;

       return $sce.trustAsHtml(input.replace(needle, function(match) {
            return '<button ng-click="goToArgumentation(' + needlewo.exec(match)[1] + ', 2, 3, false)" class="btn btn-md btn-default"> ' + needlewo.exec(match)[2] + '</button>'
        }));

    };
}]);

