'use strict';

//declare modules
var login = angular.module('login', ['ui.router', 'ngResource', 'ngAnimate']);
var admin = angular.module('admin', ['ui.router', 'ngAnimate','ngMaterial']);

var app = angular.module('couponApp', ['ui.router', 'ui.bootstrap', 'flash',
	'ngRoute',
    'ngCookies',
    'xeditable',
    
    'login',
    'admin',
    
    
]);

app.config(["$stateProvider",'$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	$stateProvider
        .state('login', {
        url: '/login',	
        controller: 'loginCtrl',
        templateUrl: 'app/login/views/login.html',
        
        })
        
         $stateProvider
         	.state('admin', {
        	url:'/admin', 
            controller: 'appCtrl',
            templateUrl: 'app/admin/views/admin.main.html'
        })
        
//        .when("/company", {
//        	controller: "companyCtrl", 
//        	templateUrl:"app/admin/views/company.view.html"
//        		
//        })
        
        //Company page state
        $stateProvider
        	.state('admin.company', {
        		url: '/company',
        		controller: 'companyCtrl',
        		templateUrl: "app/admin/views/adminCompany.html"
        	
        });
        
        //Customer page state
        $stateProvider
        	.state('admin.customer', {
        		url: '/customer',
        		templateUrl: 'app/admin/views/adminCustomer.html',
        		controller: 'customerCtrl',
        
    });
        
        //Customer page state
        $stateProvider
        	.state('admin.xeditable', {
        		url: '/xeditable',
        		templateUrl: 'app/admin/views/xeditable.html',
        		controller: 'EditableRowCtrl',
        
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

