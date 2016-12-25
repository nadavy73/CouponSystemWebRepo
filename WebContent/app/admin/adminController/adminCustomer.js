admin.controller("customerCtrl",['$scope','CustomersService', function($scope,CustomersService) {
	
	$scope.sortType     = 'custName'; // set the default sort type
	  $scope.sortReverse  = false;  // set the default sort order
	  $scope.searchCustomer   = '';     // set the default search/filter term
	
	  $scope.CustArr = [];
	  
	  
	  CustomersService.getCustomers().then(function (data){
		  	$scope.customers = data.data;
		  
		  angular.element("#loader").hide();
	  });

$scope.nameValidation = function (name) {
    if (name.length < 1) {
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

	
	//Add new Customer
	$scope.addNew = function(customer){
    	
		  
        $scope.customers.push({ 
            'custName': $scope.fullname, 
            'custPassword': $scope.password
        });
        
        CustomersService.addCustomer({'custName' : $scope.fullname,custPassword : $scope.password})
       //Todo:

};
	       
	      //Remove Customer
	        $scope.removeCustomer = function(index) {
	          $scope.customers.splice(index, 1);
	        };
	        
	        
	        $scope.saveCustomer = function(data, id) {
	            //$scope.details not updated yet
	            angular.extend(data, {id: id});
	            return $http.post('/saveUser', data);
	          };
	        
	          $scope.customers = [];
	          
	          $scope.loadCustomers = function() {
	            return $scope.customers.length ? null : $http.get("coupon/admin/getAllCustomers")
	            		
	           .success(function(data) {
	              $scope.customers = data;
	            });
	          };
	          
	          
	          $scope.showCustomer = function(detail) {
	        	    if(detail.customer && $scope.customers.length) {
	        	      var selected = $filter('filter')($scope.groups, {id: user.group});
	        	      return selected.length ? selected[0].text : 'Not set';
	        	    } else {
	        	      return detail.name;
	        	    }
	        	  };  
	         
	        $scope.showStatus = function(detail) {
	        		    var selected = [];
	        		    if(detail.password) {
	        		      selected = $filter('filter')($scope.statuses, {value: detail.password});
	        		    }
	        		    return selected.length ? selected[0].text : 'Not set';
	        		  };  
	        	  
	        	  
	        $scope.checkName = function(data, id) {
	        			    if (id === 2 && data !== 'awesome') {
	        			      return "Username 2 should be `awesome`";
	        			    }
	        			  };	  
	        	  
	        	  
	        $scope.checkAll = function () {
	            if (!$scope.selectedAll) {
	                $scope.selectedAll = true;
	            } else {
	                $scope.selectedAll = false;
	            }
	            angular.forEach($scope.personalDetails, function (personalDetails) {
	                personalDetails.selected = $scope.selectedAll;
	            });
	        };    
	}]);