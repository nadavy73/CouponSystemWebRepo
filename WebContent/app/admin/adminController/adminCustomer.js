admin.controller("customerCtrl",['$scope','CustomersService', function($scope,CustomersService) {
	
	var url ="http://localhost:8080/WebCouponProject/rest/admin/";
	$scope.sortType     = 'id'; // set the default sort type
	  $scope.sortReverse  = false;  // set the default sort order
	  $scope.searchCustomer   = '';     // set the default search/filter term
	
	  $scope.customers = [];
	  
	  //get All Customers
	  CustomersService.getCustomers().then(function (data){
		  	$scope.customers = data.data;

		  	angular.element("#loader").hide();
	  });

$scope.custNameValidation = function (custName) {
    if (custName.length < 1) {
        return "User name can't be empty";
    } else {
        return true;
    }
};   

$scope.passwordValidation = function (password) {
    var pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,9}/g;
    if (pattern.test(password) && (password.length < 10)) {
        return true;
    } else {
        return "Password must contain:\n"
            + "4-9 characters\n"
            + "At lest one upper case letter\n"
            + "At lest one lower case letter\n"
            + "At lest one digit";
    }

};

	
	//Add new Row
	$scope.addCustomer = function() {
		$scope.inserted = {
            'id': $scope.customers.id, 
			'custName': '', 
            'custPassword': ''
		};
            $scope.customers.push($scope.inserted);
	};
	       
	      //Remove Customer
	      $scope.removeCustomer = function(index) {
	    	  console.log(index);
	    	  console.log($scope.customers[index].id);
	    	  CustomersService.removeCustomer($scope.customers[index].id)
	    	  .then(
	    	    		function successCallback (response){
	    	    			// success callback
	    	    			console.log('DELETED:');
	    	                console.log(response.data);
	    	                // Delete customer from model
	    	                $scope.customers.splice(index, 1);
	    	    			}, 
	    	        		       function(response){
	    	        		         // failure call back
	    	        			 console.log('NOT DELETED:');
	    	        		       });
	    	        	  };
	       
	    	        	  $scope.updateCustomer= function (customer){
	    	        	    	CustomersService.updateCustomer().then(function (data) {
	    	        			  $scope.customers = data.data;
	    	        			  
	    	        			});
	    	        	    };
	    	        	    
	    	        	    $scope.saveUser = function(data, index) {
	    	        	    	if ($scope.customers[index].id == null) {
	    	        	    	  CustomersService.addCustomer(data).then(
	    	        	            function successCallback(response) {
	    	        	            	console.log('ADDED:');
	    	        	                console.log(response.data);
	    	        	                $scope.customers[index] = response.data;
	    	        	                
	    	        	                },
	    	        	                function errorCallback(response) {
	    	        	                	console.log('NOT DELETED:', response);
	    	        	                    $scope.customers.splice(index, 1);
	    	        	                });
	    	        	    	}
	    	        	    		else {
	    	        	   	
	    	        	    	CustomersService.updateCustomer($scope.customers[index].id, data).then(
	    	        	                    function successCallback(response) {
	    	        	                    	console.log('Customer updated', response);
	    	        	                        // update model
	    	        	                        $scope.customers[index] = response.data;
	    	        	                    },
	    	        	                    function errorCallback(response) {
	    	        	                        console.log('ERROR:', response);
	    	        	                    });
	    	        	    		}
	    	        	        };
	    	        	    		
	    	        	    	
	    	        	        
	    	        	    }]);