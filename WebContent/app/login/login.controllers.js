//'use strict';
 
login.controller('loginCtrl',
    ['$scope', '$rootScope', '$state', 'LoginService',
    function ($scope, $rootScope, $state, LoginService) {
        

    	//Default 
    	$scope.clientType = "admin";
        $scope.username = '';
        $scope.password = '';
           	
        $scope.login = function () {
            LoginService.Login($scope.username, $scope.password, $scope.clientType, function(response) {
            	debugger;
                if(response=="ok") {
            		$rootScope.clientType = $scope.clientType;
            		$state.go ($scope.clientType);
                } else {
                    $scope.error = response.message;
                }
            });
        };
    }]);