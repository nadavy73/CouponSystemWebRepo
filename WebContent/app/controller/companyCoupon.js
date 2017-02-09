company.controller("companyCouponCtrl", ['$scope','$rootScope','companyCouponService','$http',
	function($scope, $rootScope, companyCouponService, $http) {
	
	
	////////////////////////
	//Basic Arrays Lists////
	////////////////////////
	
	// Coupons model array
	$scope.coupons = [];
	//Coupon Type Array - Display as drop-down in the Table
	$scope.couponTypes =  ["Restaurants", "Clothes", "Electronics","Health", "Camping", "Travelling", "Sport", "Food" ] ;
	
	
	//////////////////////////////////////////////
    //CRUD - All Basic Function from the Service//
    //////////////////////////////////////////////
	
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
   	if (confirm("Are you sure you want to delete this coupon?")){
   		if ($scope.coupons[index].id === undefined)
	   		{
	   	   		$scope.coupons.splice(index, 1);
	   	   	}
		else {
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
							}			
                	  };
    }
         
    //////////////////
    //update coupon///      	  
    /////////////////
    $scope.updateCompany= function (coupon){
    	companyCouponService.updateCoupon().then(function (data) {
    		$scope.coupons = data.data;
          });
 };
         
    ///////////////////////////////////////////////////     
 	//Edit/Save - Opens the Edit Row for both Options//
 	//////////////////////////////////////////////////
 $scope.saveCoupon = function(data, index) {
	 debugger;	
	 if ($scope.coupons[index].id == null && (data.startDate < data.endDate))
    	{
		companyCouponService.createCoupon(data).then(
    			function successCallback(response) {
    				console.log('ADDED:');
    				console.log(response.data);
    				$scope.coupons[index] = response.data;
                     },
                function errorCallback(response) {
                    console.log('NOT DELETED:', response);
                    
                     });
		$scope.coupons.splice(index, 1);
         	}
	 
    	else if (data.startDate < data.endDate){
    		debugger;
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
    	else{
	 $scope.coupons.splice(index, 1);
	 return alert ("Didn't Add this coupon");}		
             };
         

            
             
     $scope.currencyFormatting = function(value) { 
        return value.toString() + " $"; };  
             
     // returns date in string format that the server can handel
       $scope.dateToStringFormat = function (data) {
       var today = new Date();
       var d = (today.getDate() < 10 ? '0' : '' )+ today.getDate();
       var m = ((today.getMonth() + 1) < 10 ? '0' :'') + (today.getMonth() + 1);
       var y = today.getFullYear();
       var x = String(d+"/"+m+"/"+y); 
//       return x;
       testResult = x.test(data);
       if (!testResult)
	   		return "Please enter a valid date - DD/MM/YYYY";
       };
	   
       
       //Date validations - Checks if the Input date is according to date format//	
       $scope.checkDate = function(data) {
       var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/ ;
	   testResult = date_regex.test(data);
	   console.log(data.starDate);
	   console.log(data.endDate);
//	   console.log(testResult);
	   	if (!testResult)
	   		return "Please enter a valid date - DD/MM/YYYY";
};
	
		function convertToDate(str) {
		var arr = str.split(/[\/ :]/);
		var date = new Date(+arr[2], +arr[0] + 1, +arr[1], +arr[3], +arr[4]);
		return date;
    
  }

		 
	







  	////////////////////////////////
	//Filters And Search Functions//
	///////////////////////////////
	
	////////////////////////////////////////////
	//Search Free Text (For Title Only - In HTML)
	///////////////////////////////////////////
	$scope.searchCoupon   = {};     // set the default search/filter term
	
	//////////////////////////////////////////
	//	Price Search - See More inLine 273	//
	/////////////////////////////////////////
	//Defines the Min and Max Values of the Price range filter
	$scope.priceSlider = {min:0,max:1000};
	$scope.criteria = 'price';
	
	
	
	//////////////////////////////////////////////
	//	Date Search - See More inLine 284		//
	//////////////////////////////////////////////
	//Defines the default 'From' and 'To' Dates
	$scope.from = new Date(2016, 8, 01);
	$scope.to = new Date(2019, 09, 30);
	
	
	//////////////////////////////////////
	//	Type Search - Up to Line 262	//
	/////////////////////////////////////
	
	//Contains the Coupon Type options
	$scope.CouponTypes = {
	    options: [
	    {id : 2, name : 'Show All', type: 'Show All' },
	    {id : 3, name : 'Restaurants', type: 'Restaurants' },
	    {id : 4, name : 'Clothes', type: 'Clothes' },
	    {id : 5, name : 'Electronics', type: 'Electronics' },
	    {id : 6, name : 'Health', type: 'Health' },
	    {id : 7, name : 'Camping', type: 'Camping' },
	    {id : 8, name : 'Travelling', type: 'Travelling' },
	    {id : 9, name : 'Sport', type: 'Sport' },
	    {id : 10, name : 'Food', type: 'Food' }
	    			]
	};
	       
	//Mapped to the model to filter
	$scope.filterType = {
		option: $scope.CouponTypes.options[0]
	 }
	 
	 //Coupon filter - filter based on the type selected
	 $scope.customFilter = function (coupons) {
		  if (coupons.type === $scope.filterType.option.type) {
			  return true;
		  } else if ($scope.filterType.option.type === 'Show All') {
			  return true;
		  } else {
			  return false;
	       }
	};  
	
	/////////////////////////
	//  Clear Search Text  //
	/////////////////////////
	$scope.ClearSearchText = function () {
	$scope.searchCoupon = {};
	$scope.priceSlider = {min:0,max:1000};
	$scope.from = new Date(2016, 8, 01);
	$scope.to = new Date(2019, 09, 30);
	$scope.filterType = {
	    	option: $scope.CouponTypes.options[0]
	       }
	};

}]);


	//Defines Price Filter//
	company.filter('price', function () {
    return function(coupons, greaterThan, lowerThan) {
        coupons = coupons.filter(function(coupon){
            return coupon.price >= greaterThan && coupon.price <= lowerThan;
        });

        return coupons;
    };
});
 
	//Defines DateRange Filter//
	company.filter('dateRange', function() {
    return function(records, dateKey, from, to) {
        return records.filter(function(record) {
            return !moment(record[dateKey], 'DD-MM-YYYY').isBefore(moment(from))
            && !moment(record[dateKey], 'DD-MM-YYYY').isAfter(moment(to));
        });
    }
});