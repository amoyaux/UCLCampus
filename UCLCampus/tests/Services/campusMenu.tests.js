describe('Campus Menu Unit Tests', function(){
    var CampusMenuFactory;
    beforeEach(module('ionicApp'));

    beforeEach(inject(function (_CampusMenuFactory_) {
        CampusMenuFactory = _CampusMenuFactory_;
    }));

    it('can get an instance of my factory', inject(function(CampusMenuFactory) {
        expect(CampusMenuFactory).toBeDefined();
    }));

    it('has 5 sub menus', inject(function(CampusMenuFactory) {
        expect(CampusMenuFactory.all().length).toEqual(5);
    }));
    it('3rd item is University Restaurants', inject(function(CampusMenuFactory) {
        expect(CampusMenuFactory.all()[2].title).toEqual('University Restaurants');
    }));

});