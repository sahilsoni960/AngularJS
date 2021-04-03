(function() {
  'use strict';

  angular.module('MenuApp')
    .component('itemsComponent', {
      templateUrl: 'components/items.html',
      bindings: {
        items: '<'
      }
    });
})();
