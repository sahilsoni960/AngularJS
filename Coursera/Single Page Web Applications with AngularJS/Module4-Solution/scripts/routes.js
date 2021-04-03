(function() {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig)

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      })
      .state('categories', {
        url: '/categories',
        templateUrl: 'views/categories.html',
        controller: 'CategoriesController as menuCategories',
        resolve: {
          categories: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        url: '/items?category',
        templateUrl: 'views/items.html',
        controller: 'ItemsController as menuItems',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.category);
          }],
          category: ['$stateParams', function($stateParams) {
            return $stateParams.category;
          }]
        }
      });
  }
})();
