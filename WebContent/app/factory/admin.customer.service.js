'use strict';
 
admin.factory('adminCustomersService',
		['$http', function ($http) {
        var service = {};
        	
        var url ="http://localhost:8080/WebCouponProject/rest/admin/";
        	
        service.returnValue = {};
        service.returnValue.AllCustomers = {};

        //Show All Customers
        service.getCustomers = function (){
        	angular.element("#loader").show();   	
        	return $http.get(url+"getAllCustomers")
              
        };
        
      //Create New Customer
        service.createCustomer = function(customer) {
      	 return $http({
                method: 'PUT',
                url: url + "createCustomer",
                headers: {'Content-Type': 'application/json'},
                data: customer
            })
        };
        	
      
        //Remove Customer
        service.removeCustomer = function(id) {
        	return 	 $http({ 
        		method : 'DELETE',
        		url : url + "removeCustomer/" + id,
        		headers: {'Content-Type': 'text/plain'},
        		data: id
        	});
        };  
        	

      //Update Customer
        service.updateCustomer= function(id, customer) {
        	var customerToUpdate = angular.copy(customer);
            customerToUpdate.id = id;
            
        	return $http({
                method: 'POST',
                url: url + "updateCustomer",
                headers: {'Content-Type': 'application/json'},
                data: customerToUpdate
        	
        	 });
        };
        
    return service;
}]);