describe('search for argumentation directive', function () {
    var $rootScope, $compile;

    beforeEach(module('ArgumentationController'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should correctly create a hyperlink', function () {
        var scope = $rootScope.$new();
        //Arrange
        var element = $compile("<search-for-argumentation />")($rootScope);

        //Act
        $rootScope.$digest();
        argumentation = {id: 60, title: "Ragnaros"};
        scope.createPastable(argumentation);
        expect(scope.pastable).toBe("hyperlink(" + argumentation.id + ":Ragnaros)");

    });
});