(function () {
"use strict";

angular.module('public')
.service('SignUpDataService', SignUpDataService);

function SignUpDataService() {
  var service = this;
  var userPref;

  service.setUserPref = function(userPref) {
    service.userPref = userPref;
  }

  service.getUserPref = function() {
    return service.userPref;
  }

}

})();
