admin.controller("companyCtrl", ['$scope','CompaniesService','$http', function($scope,CompaniesService, $http) {
    
	 var url ="http://localhost:8080/WebCouponProject/rest/admin/";  
	  $scope.sortType     = 'ID'; // set the default sort type
	  $scope.sortReverse  = false;  // set the default sort order
	  $scope.searchCompany   = '';     // set the default search/filter term
	
	  $scope.CompArr = [];
	

	  //var arr = CompaniesService.getCompanies();
	  CompaniesService.getCompanies().then(function (data) {
		  $scope.companies = data.data;
		  
		  angular.element("#loader").hide();
	  });
    
    $scope.compNameValidation = function (compName) {
        if (compName.length < 1) {
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

    $scope.addCompany = function() {
        $scope.inserted = {
          'ID': $scope.companies.length+1,
          'compName': '',
          'passWord': '',
          'eMail': '' 
        };
        $scope.companies.push($scope.inserted);
      
//        CompaniesService.addCompany({
//        	
//    			'compName' : $scope.compName,
//    			'eMail':	$scope.email,
//    			'passWord' : $scope.password})
//        	
//        
//        		
    	};
      

         
   	$scope.removeCompany = function(index) {
    	CompaniesService.removeCompany($scope.companies[index].id)
    	.then(
    		function successCallback (response){
    			debugger;
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
		
	  
   	  
    $scope.updateCompany= function (company){
    	CompaniesService.updateCompany().then(function (data) {
		  $scope.companies = data.data;
		  
		});
    };
    
    $scope.saveUser = function(data, index) {
    	
    	if ($scope.companies[index].id == null) {
//    	angular.extend(data, {'ID': data});
//          CompaniesService.addCompany(company)
    		CompaniesService.addCompany(data)
    		.then(
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
//    	angular.extend(data, {'ID': data});
    	CompaniesService.updateCompany($scope.companies[index].id, data).then(
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