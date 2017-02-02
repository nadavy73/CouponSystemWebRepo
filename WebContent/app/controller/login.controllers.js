//'use strict';
 
login.controller('loginCtrl',
    ['$scope', '$rootScope', '$state', 'Flash', 'LoginService',
    function ($scope, $rootScope, $state, Flash, LoginService) {
        

    	//Default 
    	$scope.clientType = "admin";
        $scope.username = '';
        $scope.password = '';
           	
        $scope.login = function () {
            LoginService.login($scope.username, $scope.password, $scope.clientType, function(response) {
            	if(response.data =="ok") {
            		$rootScope.clientType = $scope.clientType;
            		$state.go ($scope.clientType);
                } else {
                    Flash.create('danger', 'Username or password are incorrect', 'large-text');
                }
            });
        };
    }]);