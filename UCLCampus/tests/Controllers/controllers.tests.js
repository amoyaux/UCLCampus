describe('Controllers', function(){
    var scope;

    // load the controller's module
    beforeEach(module('ionicApp'));
    
    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('ScheduleController', {$scope: scope});
    }));

    // tests start here
    it('should have enabled friends to be true', function(){
        expect(scope.settings.enableFriends).toEqual(true);
    });
});