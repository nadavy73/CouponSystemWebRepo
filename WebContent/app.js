'use strict';

//declare modules
var login = angular.module('login', ['ui.router', 'ngResource', 'ngAnimate']);
var admin = angular.module('admin', ['ui.router', 'ngAnimate','ngMaterial']);
var company = angular.module('company', ['ui.router', 'ngAnimate','ngMaterial']);

var app = angular.module('couponApp', ['ui.router', 'ui.bootstrap', 'flash',
	'ngRoute',
	'ngCookies',
    'xeditable',
    
    //main modules
    'login',
    'admin',
    'company'
    
]);

app.config(["$stateProvider",'$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	//////////////////////
	///LOGIN///////////////
	/////////////////////
	$stateProvider
        .state('login', {
        url: '/login',	
        controller: 'loginCtrl',
        templateUrl: 'app/views/login.html',
        
        });
        
	
	/////////////////////////
	////////ADMIN////////////
	/////////////////////////
    $stateProvider
         	.state('admin', {
        	url:'/admin', 
            controller: 'adminMainCtrl',
            templateUrl: 'app/views/admin.main.html'
        });
        
        
        //Admin-Company page state
        $stateProvider
        	.state('admin.company', {
        		url: '/company',
        		controller: 'companyCtrl',
        		templateUrl: "app/views/adminCompany.html"
        	
        });
        
        //Admin-Customer page state
        $stateProvider
        	.state('admin.customer', {
        		url: '/customer',
        		controller: 'customerCtrl',
        		templateUrl: "app/views/adminCustomer.html"
        		
        
    });
        
        
        /////////////////////////
    	////////COMPANY////////////
    	/////////////////////////
       $stateProvider
     		.state('company', {
     			url:'/company', 
     			controller: 'companyMainCtrl',
     			templateUrl: 'app/views/company.main.html'
    });
    
        
        ///Company-Coupon//
        $stateProvider
     	.state('company.coupon', {
     		url:'/companyCoupon', 
     		controller: 'companyCouponCtrl',
     		templateUrl: 'app/views/companyCoupon.html'
    });
        
        $urlRouterProvider.otherwise('login');
}])
 
//app.run(['$rootScope', '$location', '$cookieStore', '$http',
//    function ($rootScope, $location, $cookieStore, $http) {
//        // keep user logged in after page refresh
//        $rootScope.globals = $cookieStore.get('globals') || {};
//        if ($rootScope.globals.currentUser) {
//            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
//        }
// 
//        $rootScope.$on('$locationChangeStart', function (event, next, current) {
//            // redirect to login page if not logged in
//            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
//                $location.path('/login');
//            }
//        });
//    }]);



app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});

