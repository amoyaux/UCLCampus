describe('Tools Menu Unit Tests', function(){
    var ToolsMenuFactory;
    beforeEach(module('ionicApp'));

    beforeEach(inject(function (_ToolsMenuFactory_) {
        ToolsMenuFactory = _ToolsMenuFactory_;
    }));

    it('can get an instance of my factory', inject(function(ToolsMenuFactory) {
        expect(ToolsMenuFactory).toBeDefined();
    }));

    it('has 1 sub menus', inject(function(ToolsMenuFactory) {
        expect(ToolsMenuFactory.all().length).toEqual(1);
    }));
    it('The item is map', inject(function(ToolsMenuFactory) {
        expect(ToolsMenuFactory.all()[0].title).toEqual('Maps');
    }));

});