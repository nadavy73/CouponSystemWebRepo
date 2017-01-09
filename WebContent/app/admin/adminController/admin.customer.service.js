'use strict';
 
admin.factory('CustomersService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (Base64, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};
        	
        var url ="http://localhost:8080/WebCouponProject/rest/admin/";
        	
        service.returnValue = {};
        service.returnValue.AllCustomers = {};

        service.getCustomers = function (){
     angular.element("#loader").show();   	
        	return $http.get(url+"getAllCustomers")
               .success(function (response) {

            });
        }
        
        service.addCustomer = function(fromClient) {
      	  return $http.put(url+"createCustomer",fromClient)
      	  .success(function(data,status,headers,config)
      			  {
      		  console.log("data");
      			  })
      			  .error(function(data,status){
      				  console.log("error:"+data)
      			  })
        }
      
        //Remove Customer
        service.removeCustomer = function(id) {
        	return 	 $http({ 
        		method : 'DELETE',
        		url : url + "removeCustomer/" + id,
        		headers: {'Content-Type': 'text/plain'},
        		data: id
        	});
        };  
        	
        	
        	
//        	return $http.delete(url+"removeCustomer",fromClient)
//        	  .success(function(data,status,headers,config)
//        			  {
//        		  console.log("data");
//        			  })
//        			  .error(function(data,status){
//        				  console.log("error:"+data)
//        			  })
//          }
        
    return service;
}]);