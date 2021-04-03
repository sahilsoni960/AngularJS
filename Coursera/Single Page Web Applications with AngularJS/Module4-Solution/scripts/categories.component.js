(function() {
  'use strict';

  angular.module('MenuApp')
    .component('categoriesComponent', {
      templateUrl: 'components/categories.html',
      bindings: {
        categories: '<'
      }
    });
})();
