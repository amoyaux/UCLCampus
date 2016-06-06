describe('Libraries Unit Tests', function(){
    var StudentMenu;
    beforeEach(module('ionicApp'));

    beforeEach(inject(function (LibraryFactory) {
        selectedCampus = { name : 'Louvain-la-Neuve' , lat : 50.6697251, lon : 4.6127398, maxzoom: 14};
        LibraryFactory = LibraryFactory;
    }));

    it('can get an instance of my factory', inject(function(LibraryFactory) {
        expect(LibraryFactory).toBeDefined();
    }));
    

});