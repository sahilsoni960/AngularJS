(function() {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items', 'category'];

  function ItemsController(items, category) {
    var menuItems = this;

    menuItems.items = items;
    menuItems.category = category;
  }
})();
