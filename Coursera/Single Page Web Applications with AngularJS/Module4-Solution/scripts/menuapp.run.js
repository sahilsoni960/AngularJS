(function() {
  'use strict';

  angular.module('MenuApp')
    .run(RunFunction);
  
  RunFunction.$inject = ['$rootScope', '$anchorScroll'];
  
  function RunFunction($rootScope, $anchorScroll) {
	 $rootScope.$on('$stateChangeSuccess', function(event, currentState, previousState) {
		 $anchorScroll();
	 });
  }
})();
