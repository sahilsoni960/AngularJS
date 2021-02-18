(function () {
	'use strict';

	angular.module('LunchCheck', [])
		.controller('LunchCheckController', LunchCheckController)

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
	       	$scope.dishes = "";
	        $scope.message = "";
					$scope.color='gray';


	        $scope.countingDishes = function () {
	            if ($scope.dishes.length === 0) {
	                $scope.message = "Please enter data first!";
									$scope.result = "error";
									$scope.color='red';

	            } else {
								  $scope.color='green';
	                var i=0; var n=0;
	                var dd=$scope.dishes.split(',');
	                dd.forEach((function(value){
	                    if (value.trim().length>0){i++;}
	                    else {n++;}
	                }));
	                if(i<4){$scope.message = "Enjoy!";$scope.result = "success";}
	                else{$scope.message = "Too much!";$scope.result = "success";}
	            }

	            if(n){$scope.message+= ' ('+n+' empty dish name entered)';}


	        };
	};
})();
