'use strict';

//declare modules
var login = angular.module('login', ['ui.router', 'ngResource', 'ngAnimate']);
var admin = angular.module('admin', ['ui.router', 'ngAnimate','ngMaterial']);
var company = angular.module('company', ['ui.router', 'ngAnimate','ngMaterial']);
var customer = angular.module('customer', ['ui.router', 'ngAnimate','ngMaterial']);

var app = angular.module('couponApp', ['ui.router', 'ui.bootstrap', 'flash',
	'ngRoute',
	'ngCookies',
    'xeditable',
    
    //main modules
    'login',
    'admin',
    'company',
    'customer'
    
    
]);

app.config(["$stateProvider",'$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	/////////////////
	//////LOGIN//////
	/////////////////
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
    	////////COMPANY//////////
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


        /////////////////////////
    	////////CUSTOMER/////////
    	/////////////////////////
       $stateProvider
     		.state('customer', {
     			url:'/customer', 
     			controller: 'customerMainCtrl',
     			templateUrl: 'app/views/customer.main.html'
    });
    
        
        ///Customer-Coupon//
        $stateProvider
     	.state('customer.coupon', {
     		url:'/customerCoupon', 
     		controller: 'customerCouponCtrl',
     		templateUrl: 'app/views/customerCoupon.html'
    });
        
       
        ///Customer-All Coupons
        $stateProvider
     	.state('customer.allcoupons', {
     		url:'/customerallCoupons', 
     		controller: 'customerChoosesCouponCtrl',
     		templateUrl: 'app/views/customerChooseCoupons.html'
    });
        
       
        $urlRouterProvider.otherwise('login');
}])
 

	app.run(function(editableOptions) {
		editableOptions.theme = 'bs3';
});

