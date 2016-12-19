'use strict';
 
admin.factory('CompaniesService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (Base64, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};
        	
        var url ="http://localhost:8080/WebCouponProject/rest/admin/";
        	
        service.returnValue = {};
        service.returnValue.AllCompanies = {};

        service.getCompanies = function (){
     angular.element("#loader").show();   	
        	return $http.get(url+"getallcompanies")
               .success(function (response) {

            });
        }
        
        service.addCompany = function(fromClient) {
      	  return $http.put(url+"createCompany",fromClient)
      	  .sucess(function(data,status,headers,config)
      			  {
      		  console.log("data");
      			  })
      			  .error(function(data,status){
      				  console.log("error:"+data)
      			  })
      		  
      	  
        }
        
    return service;
}]);