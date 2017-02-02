admin.controller("companyCtrl", ['$scope','adminCompanyService','$http', 
		function($scope,adminCompanyService, $http, validations) {
    
		$scope.searchCompany   = '';     // set the default search/filter term
	
	// Clear Search Text
	    $scope.ClearSearchText = function () {
	    $scope.searchText = '';
	    };
	  
	  $scope.companies = [];
	 
	  /////////////////
	 ////Validation/// 
	 ////////////////// 
	//Name Validation
	  $scope.validateName = function (name) {
			 var userExists = false;
			 angular.forEach ($scope.companies, function (company) {
				 if (userExists === false) 
				 {
					 	if(company.name === name)
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
				return "Company Name already exist\n"
					+ "Please enter different name"	;
			} 
		};  
	 
		//Password Validation
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
	  
    //get All Companies
	  adminCompanyService.getCompanies().then(function (data) {
		  $scope.companies = data.data;
		  
		  angular.element("#loader").hide();
	  });
    
    
    //Add new Row
    $scope.addCompany = function() {
        $scope.inserted = {
          'id': $scope.companies.id,
          'name': '',
          'password': '',
          'email': '' 
        };
        $scope.companies.push($scope.inserted);
};
      
	//remove Company    
   	$scope.removeCompany = function(index) {
   		console.log(index);
   		console.log($scope.companies[index].id);
   	   	if (confirm("Are you sure you want to delete this company?"))	
   	   		adminCompanyService.removeCompany($scope.companies[index].id)
   	   			.then(function successCallback (response){
   	   				// success callback
   	   				console.log('DELETED:');
   	   				console.log(response.data);
   	   				// Delete company from model
   	   				$scope.companies.splice(index, 1);
   	   				}, 
        		       function(response){
        		         // failure call back
        			 console.log('NOT DELETED:');
        		       });
        	  };
        	  
        	  
    //update company     	
	$scope.updateCompany= function (company){
    	adminCompanyService.updateCompany().then(function (data) {
		  $scope.companies = data.data;
		  
		});
    };
    
  //Edit/Add new Company
    $scope.saveCompany = function(data, index) {
    	if ($scope.companies[index].id == null) {
    	  adminCompanyService.createCompany(data).then(
            function successCallback(response) {
            	console.log('ADDED:');
                console.log(response.data);
                $scope.companies[index] = response.data;
                
                },
                function errorCallback(response) {
                	console.log('NOT DELETED:', response);
                    $scope.companies.splice(index, 1);
                });
    	}
    		else {
   	
    	adminCompanyService.updateCompany($scope.companies[index].id, data).then(
                    function successCallback(response) {
                    	console.log('Company updated', response);
                        // update model
                        $scope.companies[index] = response.data;
                    },
                    function errorCallback(response) {
                        console.log('ERROR:', response);
                    });
    		}
        };
    		
    	
        
    }]);