company.controller("companyCouponCtrl", ['$scope', function($scope) {
    
	  $scope.sortType     = 'name'; // set the default sort type
	  $scope.sortReverse  = false;  // set the default sort order
	  $scope.searchCoupon   = '';     // set the default search/filter term
	
	
	$scope.coupons = [
        {
            
        	'id':'1',
            'title':'Yosi',
            'StartDate':'',
            'EndDate': '',
            'Amount': '',
            'Type': '', 
            'Message': '',
            'Price': '',
            'Image':''
        },
        {
        	
        	'id':'2',
            'title':'Benni',
            'StartDate':'',
            'EndDate': '',
            'Amount': '',
            'Type': '', 
            'Message': '',
            'Price': '',
            'Image':''
        },
        {
        	
        	'id':'3',
            'title':'Dani',
            'StartDate':'',
            'EndDate': '',
            'Amount': '',
            'Type': '', 
            'Message': '',
            'Price': '',
            'Image':''
        }];
    
    
    $scope.titleValidation = function (id) {
        if (id.length < 1) {
            return "Coupon's Title can't be empty! Please Enter a Title ";
        } else {
            return true;
        }
    };   
    
      
    $scope.addNew = function(coupon){
            $scope.coupons.push({ 
            	'id': $index,
                'title':"",
                'StartDate':"",
                'EndDate': "",
                'Amount': "",
                'Type': "", 
                'Message': "",
                'Price': "",
                'Image':""
            });
        };
    
//        $scope.removeCoupon = function (index) {
//            alert("B4 if null");
//            if ($scope.coupons[index].id != null) {
//                alert("NOT null");
//                companyProxy.remove($scope.coupons[index].id)
//                    .then(
//                        function successCallback(response) {
//                            console.log('DELETED:');
//                            console.log(response.data);
//                            // Delete comapny from model
//                            $scope.coupons.splice(index, 1);
//                        },
//                        function errorCallback(response) {
//                            couponUtil.handleBadResponse('ERROR:', response);
//                        });
//            } else {
//                $scope.coupons.splice(index, 1);
//            }
//        };
        
        $scope.removeCoupon = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.coupons, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.coupons = newDataList;
        };
    
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.coupons, function(coupon) {
        	coupon.selected = $scope.selectedAll;
        });
    };    
   
    $scope.saveUser = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {id: id});
        return $http.post('/saveUser', data);
      };
    
}]);