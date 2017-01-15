describe("mainArgumentationController", function() {
    describe("Initialization", function() {
        var scope = null,
            controller = null;
        beforeEach(module("ArgumentationController"));
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller("mainArgumentationController", {
                $scope: scope
            });
        }));

        // Problematic code here:
        describe("mainControllerTests", function() {

            it("defaults loading to be false", function() {
                expect(scope.loading).toBe(false);
            });
        });

    });
});
