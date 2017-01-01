company.controller("companyCouponCtrl", ['$scope','$rootScope','companyCouponService','$http', 'couponTypesFactory',
		'couponFilterFactory' ,function($scope, $rootScope,companyCouponService, $http, couponFactory,
		         couponTypesFactory, couponFilterFactory) {
	// Coupons model array
	$scope.coupons = [];
	$scope.couponType= [ "RESTAURANT", "ELECTRICITY", "FOOD", "HEALTH",
            "SPORTS", "CAMPING", "TRAVELLING"];
	//Search functions
	$scope.sortType     = 'id'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchCoupon   = '';     // set the default search/filter term
	
	// Clear Search Text
    $scope.ClearSearchText = function () {
        $scope.searchText = '';
    };
    
	$scope.clientType = $rootScope.clientType;
    
//    $scope.couponFilter = couponFilterFactory();
    // List of coupon types
//    $scope.types = couponTypesFactory;
	
    $scope.titleValidation = function (data) {
    	var coupTitle = [];
    	for (var i = 0; i < $scope.coupons.length; i++) {
    		coupTitle.push($scope.coupons[i].title);
        } 
    		return "Coupon's Title can't be empty! Please Enter a Title ";

    };   
    
    
    
    //get All Coupons
    companyCouponService.getCoupons()
    	.then(function (data) {
		  $scope.coupons = data.data;
		  
		  angular.element("#loader").hide();
	  });
    
    
    
    //Add new Row
    $scope.addNewCouponRow = function(){
            $scope.inserted= { 
            	'id': null,
                'title':'',
                'startDate':'',
                'endDate': '',
                'amount': '',
                'type': '', 
                'message': '',
                'price': '',
                'image':''
            };
            $scope.coupons.push($scope.inserted);
    };
    
    	
    //Remove function
    $scope.removeCoupon = function($indec){
        	companyCouponService.removeCoupon($scope.coupons[index].id)
        	.then(
            		function successCallback (response){
            			// success callback
            			console.log('DELETED:');
                        console.log(response.data);
                        // Delete company from model
                        $scope.coupons.splice(index, 1);
            			}, 
                		       function(response){
                		         // failure call back
                			 console.log('NOT DELETED:');
                		       });
                	  };
         
       //update coupon      	  
       $scope.updateCompany= function (coupon){
        	 companyCouponService.updateCoupon().then(function (data) {
        		 $scope.coupons = data.data;
                			  
        	 });
         };
         
         
         //Edit/Add new Coupon
         $scope.saveUser = function(data, index) {
         	
         	if ($scope.coupons[index].title === null) {
         		companyCouponService.createCoupon(data)
         		.then(
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
        	
         			companyCouponService.updateCoupon($scope.coupons[index].id, data)
         				.then(
                         function successCallback(response) {
                         	console.log('Company updated', response);
                             // update model
                             $scope.coupons[index] = response.data;
                         },
                         function errorCallback(response) {
                             console.log('ERROR:', response);
                         });
                 }
             };
         
             
          // Get coupon by type
             $scope.byType = function () {
                 if ($scope.couponFilter.typeOnfocus == "All") {
                     $scope.getCoupons();
                 } else {
                	 companyCouponService.byType($scope.couponFilter.typeOnfocus)
                         .then(
                             function successCallback(response) {
                                 $scope.coupons = response.data;
                                 if ($scope.coupons == '') {
                                     $scope.couponFilter.message =
                                         "No coupons of type '" + $scope.couponFilter.typeOnfocus + "'";
                                 } else {
                                     $scope.couponFilter.message = '';
                                 }
                             },
                             function errorCallback(response) {
                                 couponUtil.handleBadResponse('ERROR:', response);
                             });
                 }
             };
             // Get coupon by price
             $scope.byPrice = function () {
                 // Set Type to All
                 document.getElementById("typeSelect").selectedIndex = ($scope.couponType.length);
                 // Purchased by price
                 if ($scope.couponFilter.upToPrice != null) {
                     companyCouponProxy.byPrice($scope.couponFilter.upToPrice)
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
                         companyCouponProxy.byStartDate(date)
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
                         companyCouponProxy.byEndDate(date)
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
             
    
}]);