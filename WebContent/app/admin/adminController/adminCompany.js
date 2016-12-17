admin.controller("companyCtrl", ['$scope', function($scope) {
    
	  $scope.sortType     = 'name'; // set the default sort type
	  $scope.sortReverse  = false;  // set the default sort order
	  $scope.searchCompany   = '';     // set the default search/filter term
	
	
	$scope.companies = [
        {
            
        	'name':'Muhammed',
            'password':'Shanid',
            'email':'shanid@shanid.com'
        },
        {
        	
        	'name':'John',
            'password':'Abraham',
            'email':'john@john.com'
        },
        {
        	
        	'name':'Roy',
            'password':'Mathew',
            'email':'roy@roy.com'
        }];
    
    
    
    
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

    
    $scope.addNew = function(company){
            $scope.companies.push({ 
                'name': "", 
                'password': "",
                'email': "",
            });
        };
    
//        $scope.removeCompany = function (index) {
//            alert("B4 if null");
//            if ($scope.companies[index].id != null) {
//                alert("NOT null");
//                companyProxy.remove($scope.companies[index].id)
//                    .then(
//                        function successCallback(response) {
//                            console.log('DELETED:');
//                            console.log(response.data);
//                            // Delete comapny from model
//                            $scope.companies.splice(index, 1);
//                        },
//                        function errorCallback(response) {
//                            couponUtil.handleBadResponse('ERROR:', response);
//                        });
//            } else {
//                $scope.companies.splice(index, 1);
//            }
//        };
        
        $scope.removeCompany = function(index){
        	 $scope.companies.splice(index, 1);
        };
        
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.companies, function(company) {
        	company.selected = $scope.selectedAll;
        });
    };    
   
    $scope.saveUser = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {id: id});
        return $http.post('/saveUser', data);
      };
    
}]);