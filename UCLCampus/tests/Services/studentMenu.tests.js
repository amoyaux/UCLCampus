describe('Student Menu Unit Tests', function(){
    var StudentMenu;
    beforeEach(module('ionicApp'));

    beforeEach(inject(function (StudentFactory) {
        StudentFactory = StudentFactory;
    }));

    it('can get an instance of my factory', inject(function(StudentFactory) {
        expect(StudentFactory).toBeDefined();
    }));

    it('has 5 sub menus', inject(function(StudentFactory) {
        expect(StudentFactory.all().length).toEqual(5);
    }));
});