describe('menuservice', function () {

  var menuservice;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuservice = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return categories list', function() {
    $httpBackend.whenGET(ApiPath + '/categories.json').respond(['Lunch', 'Dessert']);
    menuservice.getCategories().then(function(response) {
      expect(response).toEqual(['Lunch', 'Dessert']);
    });
    $httpBackend.flush();
  });

  it('should return menu items for category A', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items.json?category=A').respond(['Won Ton Soup with Chicken', 'Egg Drop Soup']);
    menuservice.getMenuItems('A').then(function(response) {
      expect(response).toEqual(['Won Ton Soup with Chicken', 'Egg Drop Soup']);
    });
    $httpBackend.flush();
  });

  it('should find menu item by name A1', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A1.json').respond(['Won Ton Soup with Chicken']);
    menuservice.getMenuItemByShortName('A1').then(function(response) {
      expect(response).toEqual(['Won Ton Soup with Chicken']);
    });
    $httpBackend.flush();
  });

    it('should report error when query menu item by name X1', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/X1.json').respond(500);
    menuservice.getMenuItemByShortName('X1').then(
      function(response) {
      }, 
      function error(error) {
        expect(error.status).toEqual(500);
    });
    $httpBackend.flush();
  });

});
