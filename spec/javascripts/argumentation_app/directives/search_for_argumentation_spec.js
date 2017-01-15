describe('search for argumentation directive', function () {
    var $rootScope, $compile;

    beforeEach(module('ArgumentationController'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should', function () {
        var scope = $rootScope.$new();
        //Arrange
        var element = $compile("<search-for-argumentation />")($rootScope);

        argumentation = {id: 60, title: "Ragnaros"};
        //var scope = element.isolateScope();
        console.log(scope);
        var match = "match";

        //Act
        $rootScope.$digest();
        scope.createPastable(argumentation);

        //Assert
        expect(scope.pastable).toBe("hyperlink(60:Ragnaros)");
    });
});