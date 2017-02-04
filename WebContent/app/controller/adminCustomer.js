admin.controller("customerCtrl",['$scope','adminCustomersService','$http',
	function($scope,adminCustomersService, $http) {
	            
	var url ="http://localhost:8080/WebCouponProject/rest/admin/";
	  $scope.searchCustomer   = '';     // set the default search/filter term
	
	  $scope.customers = [];
	  
	  //get All Customers
	  adminCustomersService.getCustomers().then(function (data){
		  	$scope.customers = data.data;

		  	angular.element("#loader").hide();
	  });

	  	 /////////////////
		 ////Validation/// 
		 ////////////////// 
		  $scope.validateName = function (name) {
				 var userExists = false;
				 angular.forEach ($scope.customers, function (customer) {
					 if (userExists === false) 
					 {
						 	if(customer.name === name)
						 {
							userExists = true;
							console.log ("Duplicate!");
							return userExists; 
						 } 
						 	else 
						 {
						 	userExists = false;
							console.log ("Not Duplicate!");
							return userExists;
						 }
					}
				 });
				if (userExists==true || name.length<1) 
				{
					return "Customer Name already exist\n"
						+ "Please enter different name"	;
				} 
			};  
		 
		  
			$scope.passwordValidation = function (custPassword) {
		        var pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,9}/g;
		        if (pattern.test(custPassword) && (custPassword.length < 10)) {
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
			'name': '', 
            'custPassword': ''
		};
        $scope.customers.push($scope.inserted);
	};
	       

	  //Remove Customer
	$scope.removeCustomer = function(index) {
		console.log(index);
		console.log($scope.customers[index].id);
		if (confirm("Are you sure you want to delete this customer?"))
			adminCustomersService.removeCustomer(
					$scope.customers[index].id).then(
					function successCallback(response) {
						// success callback
						console.log('DELETED:');
						console.log(response.data);
						// Delete customer from model
						$scope.customers.splice(index, 1);
					}, function(response) {
						// failure call back
						console.log('NOT DELETED:');
					});
	};

	$scope.updateCustomer = function(customer) {
		adminCustomersService.updateCustomer().then(function(data) {
			$scope.customers = data.data;

		});
	};

	$scope.saveCustomer = function(data, index) {
		if ($scope.customers[index].id == null) {
			adminCustomersService.createCustomer(data).then(
					function successCallback(response) {
						console.log('ADDED:');
						console.log(response.data);
						$scope.customers[index] = response.data;

					}, function errorCallback(response) {
						console.log('NOT DELETED:', response);
						$scope.customers.splice(index, 1);
					});
		} else {

			adminCustomersService.updateCustomer(
					$scope.customers[index].id, data).then(
					function successCallback(response) {
						console.log('Customer updated', response);
						// update model
						$scope.customers[index] = response.data;
					}, function errorCallback(response) {
						console.log('ERROR:', response);
					});
		}
	};

} ]);