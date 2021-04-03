(function() {
  'use strict';

  angular.module('MenuApp')
    .constant('API', {
      url: 'https://davids-restaurant.herokuapp.com',
      endpoint: {
        categories: '/categories.json',
        items: '/menu_items.json'
      }
    });
})();
