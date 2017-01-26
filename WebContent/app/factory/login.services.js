'use strict';
 
login.factory('LoginService',
    ['$http','$rootScope',
    function ($http, $rootScope) {
        var service = {};

        service.Login = function (username, password, clientType, callback) {

            
            $http.post("http://localhost:8080/WebCouponProject/rest/"+ clientType + "/login/"
                    + username + "/"
                    + password)
                .then(function (response) {
                	if (response="ok"){
                		 callback(response);
                	}
                   
                 });
        };
 
        return service; 

    }])
 

