'use strict';
 
company.factory('companyCouponService',
    ['$http',
    function ($http) {
        var service = {};
        	
        var url ="http://localhost:8080/WebCouponProject/rest/company/";
        	
        service.returnValue = {};
        service.returnValue.AllCoupons = {};

        //Get All Coupons
        service.getCoupons = function (){
        	angular.element("#loader").show();   	
        	return $http.get(url+"getAllCoupons")
        };
        
        //Create New Coupon
        service.createCoupon = function(coupon) {
        	
//        coupon.startDate = service.getFormattedDate(coupon.startDate);
//        coupon.endDate = service.getFormattedDate(coupon.endDate);
      	  return $http({
              method: 'PUT',
              url: url + "createCoupon",
              headers: {'Content-Type': 'application/json'},
              data: coupon
          })
      };
      	  
      	//Remove Coupon  
        service.removeCoupon = function(id) {
        	return 	 $http({ 
        		method : 'DELETE',
        		url : url + "removeCoupon/" + id,
        		headers: {'Content-Type': 'text/plain'},
        		data: id
        	});
        };
        	
        	
        //Update Coupon
        service.updateCoupon= function(id, coupon) {
        	var couponToUpdate = angular.copy(coupon);
        	couponToUpdate.id = id;
//        	couponToUpdate.price = coupon.price;
//        	couponToUpdate.endDate = coupon.endDate;
            
        	return $http({
                method: 'POST',
                url: url + "updateCoupon",
                headers: {'Content-Type': 'application/json'},
                data: couponToUpdate
        	
        	 });
        };
        	
        service.byType = function (type) {
            return $http({
                method: 'POST',
                url: url + "getCouponByType",
                headers: {'Content-Type': 'text/plain'},
                data: type
            });
        };
        
        service.byPrice = function (price) {
            return $http({
                method: 'POST',
                url: url + "getCouponByPrice",
                headers: {'Content-Type': 'text/plain'},
                data: price
            });
        };
        
       service.byStartDate = function (date) {
           //format date to dd/MM/yyyy
    	   date = service.getFormattedDate(date);
            return $http({
                method: 'POST',
                url: url + "getCouponByStartDate",
                headers: {'Content-Type': 'text/plain'},
                data: date
            });
        };
        
        //returns date in string format (dd/MM/yyyy) that the server can handel
        service.getFormattedDate = function (date) {
        	 if (date == "") return "";
        	 try {
        	var year = date.getFullYear();
      	  	var month = (1 + date.getMonth()).toString();
      	  	month = month.length > 1 ? month : '0' + month;
      	  	var day = date.getDate().toString();
      	  	day = day.length > 1 ? day : '0' + day;
      	  	return day + '/' + month + '/' + year;
      	  	
        	 }
        	    catch (err) {
        	        return "error";
        	    }
        	};
        
        service.byEndDate = function (date) {
          date = service.getFormattedDate(date);
            return $http({
                method: 'POST',
                url: url + "getCouponByEndDate",
                headers: {'Content-Type': 'text/plain'},
                data: date
            });
        };
       return service;
}]);