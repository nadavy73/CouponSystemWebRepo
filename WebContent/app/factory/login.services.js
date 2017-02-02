'use strict';
 
login.factory('LoginService',
    ['$http',
    function ($http) {
        var service = {};

        service.login = function (username, password, clientType, callback) {
        	$http.post("http://localhost:8080/WebCouponProject/rest/"+ clientType + "/login/"
                    + username + "/"
                    + password)
                    .then(function (response) {
                    	callback(response);
                     });
                
            };
 
        return service; 

    }])
 

