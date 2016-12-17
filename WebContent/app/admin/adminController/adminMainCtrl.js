app.controller("adminMainCtrl", ['$rootScope', '$scope', '$state', '$location', 'Flash',
	function ($rootScope, $scope, $state, $location, Flash) {

	    var vm = this;

	  
	  //controll sidebar open & close in mobile and normal view
	    vm.sideBar = function (value) {
	        if($(window).width()<=767){
	        if ($("body").hasClass('sidebar-open'))
	            $("body").removeClass('sidebar-open');
	        else
	            $("body").addClass('sidebar-open');
	        }
	        else {
	            if(value===1){
	            if ($("body").hasClass('sidebar-collapse'))
	                $("body").removeClass('sidebar-collapse');
	            else
	                $("body").addClass('sidebar-collapse');
	            }
	        }
	    };

	    console.log('getting in to the admin controller');
	    
	}]);
