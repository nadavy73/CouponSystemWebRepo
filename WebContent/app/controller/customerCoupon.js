customer.controller("customerCouponCtrl", ['$scope','$rootScope','customerCouponService','$http',
	function($scope, $rootScope, customerCouponService, $http) {
	
	//Search functions
	$scope.searchCoupon   = '';     // set the default search/filter term
	
	// Clear Search Text
    $scope.ClearSearchText = function () {
    $scope.searchText = '';
    };
    
    $scope.clientType = $rootScope.clientType;
	// Coupons model array
	$scope.coupons = [];
	
	
	$scope.couponTypes =  ["Restaurants", "Clothes", "Electronics","Health", "Camping", "Travelling", "Sport", "Food" ] ;

	
	//get All Coupons
    customerCouponService.getCoupons().then(function (data) {
		  $scope.coupons = data.data;
		  
		  angular.element("#loader").hide();
	  });
    
   
    //Add new Row
    $scope.addNewCouponRow = function(){
		
    	$scope.coupons.startDate = new Date($scope.coupons.startDate);    
    	$scope.coupons.endDate = new Date($scope.coupons.endDate);    

    	$scope.inserted= { 
    			'id': $scope.coupons.id,
                'title':'',
                'startDate':'',
                'endDate': '',
                'amount': '',
                'type': '',
                'message': '',
                'price': '',
                'image':'',
            };
            $scope.coupons.push($scope.inserted);
    };
    
    	
    //Remove Coupon
    $scope.removeCoupon = function(index){
    	console.log(index);
   		console.log($scope.coupons[index].id);	
   	if (confirm("Are you sure you want to delete this coupon?"))	
    customerCouponService.removeCoupon($scope.coupons[index].id)
        	.then(function successCallback (response){
            			// success callback
            			console.log('DELETED:');
                        console.log(response.data);
                        // Delete coupon from model
                        $scope.coupons.splice(index, 1);
            			}, 
                		       function(response){
                		         // failure call back
                			 console.log('NOT DELETED:');
                		       });
                	  };
         
       //update coupon      	  
       $scope.updateCustomer= function (coupon){
        	 customerCouponService.updateCoupon().then(function (data) {
        		 $scope.coupons = data.data;
                			  
        	 });
         };
         
         
         //Edit/Add new Coupon
         $scope.saveCoupon = function(data, index) {
         	if ($scope.coupons[index].id == null) {
         		customerCouponService.createCoupon(data).then(
                 function successCallback(response) {
                 	console.log('ADDED:');
                     console.log(response.data);
                         $scope.coupons[index] = response.data;
                     },
                     function errorCallback(response) {
                     	console.log('NOT DELETED:', response);
                         $scope.coupons.splice(index, 1);
                     });
         	}
         		else {
        	
         			customerCouponService.updateCoupon($scope.coupons[index].id, data).then(
                         function successCallback(response) {
                         	console.log('Coupon updated', response);
                            // update model
                             $scope.coupons[index] = response.data;
                         },
                         function errorCallback(response) {
                             console.log('ERROR:', response);
                         });
                 }
             };
         
           //Contains the filter options
             $scope.typesOptions = {
               couponTypes: [
                         {id : 2, name : 'Show All', type: 9 },
                         {id : 3, name : 'Restaurants', type: 8 },
                         {id : 4, name : 'Clothes', type: 7 },
                         {id : 5, name : 'Electronics', type: 6 },
                         {id : 6, name : 'Health', type: 5 },
                         {id : 7, name : 'Camping', type: 4 },
                         {id : 8, name : 'Travelling', type: 3 },
                         {id : 9, name : 'Sport', type: 2 },
                         {id : 10, name : 'Food', type: 1 }
                        ]
                      };
           //Contains the sorting options
           $scope.sortOptions = {
        		   couponTypes: [
               {id : 1, name : 'Price Highest to Lowest' },      
               {id : 2, name : 'Price Lowest to Highest' },
               ]
           };
           
           //Mapped to the model to filter
           $scope.filterItem = {
             type: $scope.typesOptions.couponTypes[0]
           }
           
           //Mapped to the model to sort
           $scope.sortItem = {
             type: $scope.sortOptions.couponTypes[0]
           };
           
           //Watch the sorting model - when it changes, change the
           //ordering of the sort (descending / ascending)
           $scope.$watch('sortItem', function () {
             console.log($scope.sortItem);
             if ($scope.sortItem.type.id === 1) {
               $scope.reverse = true;
             } else {
               $scope.reverse = false;
             }
           }, true);
           
           //Custom filter - filter based on the rating selected
           $scope.customFilter = function (data) {
             if (data.couponType === $scope.filterItem.couponType.type) {
               return true;
             } else if ($scope.filterItem.couponType.type === 9) {
               return true;
             } else {
               return false;
             }
           };  
             
             
             
             
             
             
          // Get coupon by type
             $scope.byType = function () {
                 if ($scope.couponTypes == "All") {
                     $scope.getCoupons();
                 } else {
                	 customerCouponService.byType($scope.couponTypes)
                         .then(
                             function successCallback(response) {
                                 $scope.coupons = response.data;
                                 if ($scope.coupons == '') {

                                 } else {

                                 }
                             },
                             function errorCallback(response) {
                                 console.log("Error " + response);
                             });
                 }
             };
             // Get coupon by price
             $scope.byPrice = function () {
                 // Set Type to All
                 document.getElementById("typeSelect").selectedIndex = ($scope.couponType.length);
                 // Purchased by price
                 if ($scope.couponFilter.upToPrice != null) {
                     customerCouponProxy.byPrice($scope.couponFilter.upToPrice)
                         .then(
                             function successCallback(response) {
                                 $scope.coupons = response.data;
                                 if ($scope.coupons.length == 0) {
                                     $scope.message = 'no coupons in that price range';
                                 } else {
                                     $scope.message = '';
                                 }
                             },
                             function errorCallback(response) {
                                 couponUtil.handleBadResponse('ERROR:', response);
                             });
                 }
             };
             // Get coupon by start or end date
             $scope.ByDate = function () {
                 var date = $scope.couponFilter.date;
                 if (date != null) {
                     if ($scope.couponFilter.dateRadio == "start") {
                         customerCouponProxy.byStartDate(date)
                             .then(
                                 function successCallback(response) {
                                     $scope.coupons = response.data;
                                     if ($scope.coupons != '') {
                                         $scope.couponFilter.message = '';
                                     } else {
                                         $scope.couponFilter.message = "No coupon in that date range";
                                     }
                                 },
                                 function errorCallback(response) {
                                     couponUtil.handleBadResponse('ERROR:', response);
                                 });
                     } else if ($scope.couponFilter.dateRadio == "end") {
                         customerCouponProxy.byEndDate(date)
                             .then(
                                 function successCallback(response) {
                                     $scope.coupons = response.data;
                                     if ($scope.coupons != '') {
                                         $scope.couponFilter.message = '';
                                     } else {
                                         $scope.couponFilter.message = "No coupon in that date range";
                                     }
                                 },
                                 function errorCallback(response) {
                                     $scope.couponFilter.message = "No coupon in that date range";
                                     couponUtil.handleBadResponse('ERROR:', response);
                                 });
                     }
                 }
             };   
   

             
             $scope.dateRangeFilter = function (property, startDate, endDate) {
            	    return function (item) {
            	        if (item[property] === null) return false;
            	 
            	        var itemDate = moment(item[property]);
            	        var s = moment(startDate, "dd/MM/yyyy");
            	        var e = moment(endDate, "dd/MM/yyyy");
            	 
            	        if (itemDate >= s && itemDate <= e) return true;
            	        return false;
            	    }
            	};
             
             
             $scope.imageUpload = function(event){
                 var files = event.target.files; //FileList object
                 
                 for (var i = 0; i < files.length; i++) {
                     var file = files[i];
                         var reader = new FileReader();
                         reader.onload = $scope.imageIsLoaded; 
                         reader.readAsDataURL(file);
                 }
            }

            $scope.imageIsLoaded = function(e){
                $scope.$apply(function() {
                    $scope.coupons.push(e.target.result);
                });
            }    
            
            //date validation
            $scope.checkDate = function(data) {
            var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/ ;
            testResult = date_regex.test(data);
              console.log(testResult);
        			if (!testResult)
        		    	return "Please enter a valid date - dd/MM/YYYY";
            };
            
            $scope.validateDates = function(data) {
            	    console.log('IN VALIDATEDATES');
            	    console.log(data.startDate);
            	    console.log(data.endDate);
            	      
            	    var startDt = new Date(data.startDate);
            		var endDt = new Date(data.endDate);
            		console.log(startDt);
            	    console.log(endDt);
            	     if (startDt > endDt) {
            	    return "DATE START has to be smaller than DATE END."; 
            	    console.log('startDt > endDt');
            					console.log(startDt);
                        	    console.log(endDt);
                        	    console.log ("***********");
            					return false;	
            	     }
            	     else
            	    	console.log(startDt);
            	     	console.log ("***********");
             	     	console.log(endDt);
            	    	 return true;
            	     
};
           	   
    
}]);


 