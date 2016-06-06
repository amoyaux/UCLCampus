describe('Town Menu Unit Tests', function(){
    var TownMenuFactory;
    beforeEach(module('ionicApp'));

    beforeEach(inject(function (_TownMenuFactory_) {
        TownMenuFactory = _TownMenuFactory_;
    }));

    it('can get an instance of my factory', inject(function(TownMenuFactory) {
        expect(TownMenuFactory).toBeDefined();
    }));

    it('has 5 sub menus', inject(function(TownMenuFactory) {
        expect(TownMenuFactory.all().length).toEqual(1);
    }));
    it('The item is movie', inject(function(TownMenuFactory) {
        expect(TownMenuFactory.all()[0].title).toEqual('Cinema');
    }));
});