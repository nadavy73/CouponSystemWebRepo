//'use strict';
 
login.controller('loginCtrl',
    ['$scope', '$rootScope', '$location', '$state', 'LoginService',
    function ($scope, $rootScope, $location, $state, LoginService) {
        // reset login status
//        AuthenticationService.ClearCredentials();
    	
    	//Default 
    	$scope.clientType = "CUSTOMER";
        $scope.username = '';
        $scope.password = '';
           	
        $scope.login = function () {
            $scope.dataLoading = true;
            LoginService.Login($scope.username, $scope.password, $scope.clientType, function(response) {
                if(response.success) {
            		LoginService.SetCredentials($scope.username, $scope.password, $scope.clientType);
            		$rootScope.clientType = $scope.clientType;
            		$state.go ('admin.company');
//            		$state.go ("'"+ clientType.toLowerCase()+ "'");
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);