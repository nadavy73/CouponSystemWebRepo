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
        
        
        
        service.addCompany = function(company) {
      	  return $http({
              method: 'PUT',
              url: url + "createCompany",
              headers: {'Content-Type': 'application/json'},
              data: company
          })
      };
      	  
      	  
//		service.addCompany = function(fromClient) {
//        	  return $http.put(url+"createCompany",fromClient)
//        	  .success(function(data,status,headers,config)
//        			  {
//        		  console.log(data);
//        			  })
//        			  .error(function(data,status){
//        				  console.log("error:"+data)
//        			  })
//        		  
//        	  
//          }
        
        service.removeCompany = function(ID) {
        	return 	 $http({ 
        		method : 'DELETE',
        		url : url + "removeCompany",
        		headers: {'Content-Type': 'text/plain'},
        		data: ID
        	});
        };
        	
        	
        //Update Company
        service.updateCompany= function(id, company) {
        	var companyToUpdate = angular.copy(company);
            companyToUpdate.id = id;
            
        	return $http({
                method: 'POST',
                url: url + "updateCompany",
                headers: {'Content-Type': 'application/json'},
                data: companyToUpdate
        	
        	 });
        };
        	
        	
        	
        	
        	
        	
        	
//        	$http.post(url+"updateCompany", fromClient)
// 
//        	  .success(function(data,status,headers,config)
//        		 {
//        		  console.log(data);
//        			  })
//        			  .error(function(data,status){
//        				  console.log("error:"+data)
//        			  })
//        }
//        
    
        
        
        
        return service;
}]);