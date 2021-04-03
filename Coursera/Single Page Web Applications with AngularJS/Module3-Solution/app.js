(function(){
'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


//Found items directive
function FoundItemsDirective(){
  var ddo = {
    restrict: 'E',
  templateUrl: 'foundItems.html',
  scope: {
    found: '<',
    // myTitle: '@title',
    // badRemove: '=',
    onRemove: '&',
      empty: '<'
  },
  controller: NarrowItDownController,
  controllerAs: 'menu',
  bindToController: true
};

return ddo;
}


//Controller function
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var menu = this;
menu.searchTerm = '';
menu.empty ='';
//   var promise = MenuSearchService.getMatchedMenuItems($scope.item);
//   promise.then(function (response) {
//   menu.categories = response.data;
// })
// .catch(function (error) {
//   console.log("Something went terribly wrong.");
// });
menu.narrow = function(searchTerm) {
        if(searchTerm == ''){
          menu.empty = "Nothing Found";
          menu.found =[];
          console.log("menu.empty",  menu.empty);
        }else{
          menu.empty = "";
          console.log("menu.empty",  menu.empty);
           MenuSearchService.getMatchedMenuItems(searchTerm)
               .then(function (response) {
                   menu.found = response;
                   if(menu.found.length ==0){
                     menu.empty = "Nothing Found";
                     console.log("NOt MATCHING");
                   }

                   menu.title = (menu.found.length+" item(s) found");
                   // menu.filter = searchTerm;
                   console.log("items",menu.found[1].description);
               })
               .catch(function (error) {
                  console.log("error in click function");
               });
             }
       };



menu.remove = function (itemIndex) {
   // console.log("'this' is: ", this);
   // this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
   console.log("itemIndex",itemIndex);
  MenuSearchService.removeItem(itemIndex);
   // menu.found.splice(itemIndex, 1);
   // this.title = origTitle + " (" + list.items.length + " items )";
 }

}

//service function
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];
  service.getMatchedMenuItems = function (searchTerm) {
    return  $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")})
      .then(function(response){

        var completeMenu = response.data.menu_items;


        //Find matching menu_items
        if(searchTerm.length == 0){
          completeMenu = [];
        }else{
          foundItems = [];
          for (var i = 0; i < completeMenu.length; i++) {
                   var str = completeMenu[i].description;

                   if (str.toLowerCase().indexOf(searchTerm) >= 0) {
                       foundItems.push(completeMenu[i]);
                   }
               }
           }

        return foundItems;
      })
      .catch(function(error){
        console.log("Error in service function");

      });

    // return response;
  };


  service.removeItem = function (itemIndex) {
    console.log("itemIndex",itemIndex);
  foundItems.splice(itemIndex, 1);
  // return foundItems;
};

}


})();
