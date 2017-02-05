'use strict';
 
customer.factory('customerCouponService',
    ['$http',
    function ($http) {
        var service = {};
        	
        var url ="http://localhost:8080/WebCouponProject/rest/customer/";
        	
        service.returnValue = {};
        service.returnValue.AllCoupons = {};

        //Get All Purchased Coupons
        service.getCoupons = function (){
        	angular.element("#loader").show();   	
        	return $http.get(url+"getAllPurchasedCoupons")
        };
        
      //Show All available Coupons
        service.getAvailableCoupons = function (){
        	angular.element("#loader").show();   	
        	return $http.get(url+"getAllAvailableCoupons")
        };
        
        //Create New Coupon
        service.createCoupon = function(coupon) {
      	  return $http({
              method: 'PUT',
              url: url + "createCoupon",
              headers: {'Content-Type': 'application/json'},
              data: coupon
          })
      };
      
      	//purchase Coupon
      	service.purchaseCoupon = function(id){
      		return $http({
      			method: 'POST',
      			url: url + "purchaseCoupon",
      			headers: {'Content-Type': 'text/plain'},
                data: id
      		});
      	};
      	  
      
       return service;
}]);