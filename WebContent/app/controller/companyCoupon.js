company.controller("companyCouponCtrl", ['$scope','$rootScope','companyCouponService','$http', '$filter' ,
	function($scope, $rootScope,companyCouponService, $http, $filter) {
	
	//Search functions
//	$scope.sortType     = 'id'; // set the default sort type
//	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchCoupon   = '';     // set the default search/filter term
	
	// Clear Search Text
    $scope.ClearSearchText = function () {
    $scope.searchText = '';
    };
    
    
	// Coupons model array
	$scope.coupons = [];
		
	$scope.couponTypes = {
			  "types": [{
				  	typeCode: 'RE', 	
				  	typeName: 'Restaurant'
					 }, { 
					typeCode: 'EL', 
					typeName: 'Electricity'
					 }, { 
					typeCode: 'FO',
					typeName: 'Food' 
					 }, {
					typeCode: 'HE',	
					typeName: 'Health' 
					},{ 
					typeCode: 'SP',	
					typeName: 'Sport' 
					},{ 
					typeCode: 'CA',	
					typeName: 'Camping' 
					},{ 
					typeCode: 'TR',	
					typeName: 'Travelling'
						}
					],
			defaultOption: {
			typeCode: 'FO',
			typeName: 'Food'
	} 
	//This sets the default value of the select in the ui
	};
			 
		    
//    	$scope.couponFilter = couponFilterFactory();
// 		List of coupon types
//    	$scope.types = couponTypesFactory;
	
//    $scope.titleValidation = function (data) {
//    	var coupTitle = [];
//    	for (var i = 0; i < $scope.coupons.length; i++) {
//    		coupTitle.push($scope.coupons[i].title);
//        } 
//    		return "Coupon's Title can't be empty! Please Enter a Title ";
//
//    };   
    
    
    
    //get All Coupons
    companyCouponService.getCoupons().then(function (data) {
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
                'type': $scope.couponTypes.defaultOption.typeName, 
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
    companyCouponService.removeCoupon($scope.coupons[index].id)
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
       $scope.updateCompany= function (coupon){
        	 companyCouponService.updateCoupon().then(function (data) {
        		 $scope.coupons = data.data;
                			  
        	 });
         };
         
         
         //Edit/Add new Coupon
         $scope.saveCoupon = function(data, index) {
         	if ($scope.coupons[index].id == null) {
         		companyCouponService.createCoupon(data).then(
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
        	
         			companyCouponService.updateCoupon($scope.coupons[index].id, data).then(
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
//          var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;

            
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
            	     $scope.showPageError = true;
            					$scope.pageErrorText = "DATE START has to be smaller than DATE END.";
            			    	return false;	
            	     }
            	     else
            	     	return true;

            	      
            	    };
            	    $scope.showConfirm = function(ev) {
            	        // Appending dialog to document.body to cover sidenav in docs app
            	        var confirm = $mdDialog.confirm()
            	              .title('Would you like to delete this Coupon?')
            	              .textContent('After Deleting this you will not be able to retore it.')
            	              .ariaLabel('Lucky day')
            	              .targetEvent(ev)
            	              .ok('Delete!')
            	              .cancel('Cancel Action');

            	        $mdDialog.show(confirm).then(function() {
            	          $scope.status = 'You decided to delete this coupon.';
            	        }, function() {
            	          $scope.status = 'You decided to keep this coupon.';
            	        });
            	      };
    
}]);