//'use strict';
 
login.controller('loginCtrl',
    ['$scope', '$rootScope', '$location', '$state', 'LoginService',
    function ($scope, $rootScope, $location, $state, LoginService) {
        // reset login status
//        AuthenticationService.ClearCredentials();
    	
    	//Default 
    	$scope.clientType = "customer";
        $scope.username = '';
        $scope.password = '';
           	
        $scope.login = function () {
            $scope.dataLoading = true;
            LoginService.Login($scope.username, $scope.password, $scope.clientType, function(response) {
                if(response.success) {
            		LoginService.SetCredentials($scope.username, $scope.password, $scope.clientType);
            		$rootScope.clientType = $scope.clientType;
            		$state.go ($scope.clientType);
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);