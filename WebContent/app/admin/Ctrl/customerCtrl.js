admin.controller("customerCtrl", function($scope, $filter, $http) {
	
	$scope.details = [
	        {
	            id: 1,
	        	name:'Muhammed',
	            password:'Shanid',
	            
	        },
	        {
	        	id: 2,
	        	'name':'John',
	            'password':'Abraham',
	            
	        },
	        {
	        	id: 3,
	        	name:'Roy',
	            password:'Mathew',
	            
	        }];
	    
	//Add new Customer
	$scope.addNewCustomer = function(){
		$scope.inserted = {
				id: $scope.details.length+1, 
              name: details.name,
              password: details.password,
				};
	            $scope.details.push($scope.inserted);
	        };
	       
	      //Remove Customer
	        $scope.removeCustomer = function(index) {
	          $scope.details.splice(index, 1);
	        };
	        
	        
//	        //Remove Company
//	        $scope.removeCompany = function(){
//	            var newDataList=[];
//	            $scope.selectedAll = false;
//	            angular.forEach($scope.personalDetails, function(selected){
//	                if(!selected.selected){
//	                    newDataList.push(selected);
//	                }
//	            }); 
//	            $scope.personalDetails = newDataList;
//	        };
	    
	        $scope.saveCustomer = function(data, id) {
	            //$scope.details not updated yet
	            angular.extend(data, {id: id});
	            return $http.post('/saveUser', data);
	          };
	        
	          
	          
	          $scope.customers = [];
	          $scope.loadcustomers = function() {
	            return $scope.customers.length ? null : $http.get('coupon/admin/getallcustomers')
	            		
	           .success(function(data) {
	              $scope.customers = data;
	            });
	          };
	          
	          
	          $scope.showCustomer = function(detail) {
	        	    if(detail.customer && $scope.customers.length) {
	        	      var selected = $filter('filter')($scope.groups, {id: user.group});
	        	      return selected.length ? selected[0].text : 'Not set';
	        	    } else {
	        	      return detail.name;
	        	    }
	        	  };  
	         
	        	  $scope.showStatus = function(detail) {
	        		    var selected = [];
	        		    if(detail.password) {
	        		      selected = $filter('filter')($scope.statuses, {value: detail.password});
	        		    }
	        		    return selected.length ? selected[0].text : 'Not set';
	        		  };  
	        	  
	        	  
	        		  $scope.checkName = function(data, id) {
	        			    if (id === 2 && data !== 'awesome') {
	        			      return "Username 2 should be `awesome`";
	        			    }
	        			  };	  
	        	  
	        	  
	        	  
	        	  
	        	  
	        $scope.checkAll = function () {
	            if (!$scope.selectedAll) {
	                $scope.selectedAll = true;
	            } else {
	                $scope.selectedAll = false;
	            }
	            angular.forEach($scope.personalDetails, function (personalDetails) {
	                personalDetails.selected = $scope.selectedAll;
	            });
	        };    
	});