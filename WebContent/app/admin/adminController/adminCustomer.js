admin.controller("customerCtrl", function($scope, $filter, $http) {
	
	$http.get("http://www.w3schools.com/angular/customers.php")
    .then(function (response) {$scope.customers = response.data.records;});

	//Add new Customer
	$scope.addNewCustomer = function(){
		$scope.inserted = {
		id: $scope.customers.length+1, 
        name: customerss.name,
        password: customers.password,
				};
	            $scope.customers.push($scope.inserted);
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
	});