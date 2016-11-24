(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .controller('appController', appController)
        .run(run);
        

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/homepage', {
                controller: 'HomeController',
                templateUrl: 'views/homepage/homepage.view.html',
                controllerAs: 'vm'
            })

            .when('/setting', {
                controller: 'ServiceChangeController',
                templateUrl: 'views/userhome/service_Change.view.html',
                controllerAs: 'vm'
            })

            .when('/userhome', {
                controller: 'UserHomeController',
                templateUrl: 'views/userhome/userhome.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'views/login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/addNewProduct', {
                controller: 'addNewProduct',
                templateUrl: 'views/addNewProduct/addNewProduct.view.html',
                controllerAs: 'product'
            })
            .when('/thankyou', {
                controller: 'thankyou',
                templateUrl: 'views/thankyou/thankyou.view.html',
                controllerAs: 'thankyou'
            })
            .when('/completeDisplay', {
                controller: 'completeDisplay',
                templateUrl: 'views/completeDisplay/completeDisplay.view.html',
                controllerAs: 'vm'
            })
            .when('/salesWelcome', {
                controller: 'salesWelcome',
                templateUrl: 'views/sales/salesWelcome/salesWelcome.view.html',
                controllerAs: 'vm'
            })
            .when('/billing', {
                controller: 'billingController',
                templateUrl: 'views/sales/Billing/billGeneration.view.html',
                controllerAs: 'vm'
            })
            .when('/customerHome', {
                controller: 'customerHomeController',
                templateUrl: 'views/customer/home/customerHome.view.html',
                controllerAs: 'vm'
            })

            .when('/customerRegistration', {
                controller: 'customerRegistration',
                templateUrl: 'views/customer/registration/customerRegistration.view.html',
                controllerAs: 'customer'
            })

            .when('/customerActions', {
                controller: 'customerActions',
                templateUrl: 'views/customer/Actions/customerActions.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/homepage' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http,AuthenticationService) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/homepage', '/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/homepage');
            }
        });
    }

     appController.$inject = ['$rootScope','$http', '$scope','$filter','$timeout','$route','AuthenticationService','$location'];
    function appController($rootScope, $http, $scope,$filter,$timeout,$route,AuthenticationService,$location) 
    {
        //console.log("user: "+$rootScope.globals.currentUser);
        if($rootScope.globals.currentUser != null){
            $scope.InvoiceStaff = $rootScope.globals.currentUser.username;
            $scope.Menu = "Menu";
            $scope.Home = "Home";
            $scope.Sales = "Sales";
            $scope.Customer = "Customer";
            $scope.Inventory = "Inventory";
            $scope.Stock = "Stock";
        }

        $scope.Logout = function(){
            AuthenticationService.ClearCredentials();
            $scope.InvoiceStaff = null;
            $rootScope.menu = {
            'display' : "none"
            };
            $location.path('/thankyou');
        }
        $rootScope.currentPage = function(){

            var page = $rootScope.globals.currentUser.currentPage;
            console.log("currentPage : " + page);
            switch(page) {
                case "home":
                        $rootScope.home = {
                        'background-color': "#eee",
                        'cursor': "default"
                        };
                        $rootScope.inventory = $rootScope.sales = $rootScope.customer = $rootScope.stock ={
                        'background-color': "#fff",
                        'cursor' : "pointer"
                        };
                    break;
                case "inventory":
                        $rootScope.inventory = {
                        'background-color': "#eee",
                        'cursor': "default"
                        };
                        $rootScope.home = $rootScope.sales = $rootScope.customer = $rootScope.stock ={
                        'background-color': "#fff",
                        'cursor' : "pointer"
                        };
                    break;
                case "sales":
                        $rootScope.sales = {
                        'background-color': "#eee",
                        'cursor': "default"
                        };
                        $rootScope.inventory = $rootScope.home = $rootScope.customer = $rootScope.stock ={
                        'background-color': "#fff",
                        'cursor' : "pointer"
                        };
                    break;
                case "customer":
                        $rootScope.customer = {
                        'background-color': "#eee",
                        'cursor': "default"
                        };
                        $rootScope.inventory = $rootScope.home = $rootScope.sales = $rootScope.stock ={
                        'background-color': "#fff",
                        'cursor' : "pointer"
                        };
                    break;
                case "stock":
                        $rootScope.stock = {
                        'background-color': "#eee",
                        'cursor': "default"
                        };
                        $rootScope.inventory = $rootScope.home = $rootScope.customer = $rootScope.sales ={
                        'background-color': "#fff",
                        'cursor' : "pointer"
                        };
                    break;
                default:
                    
                }
            if (page=="home") 
            {
                $rootScope.home = {
                'background-color': "#eee",
                'cursor': "default"
                };
            }
        }
    }

    /*app.use(session({
        cookieName: 'session',
        secret: 'random_string_goes_here',
        duration: 30 * 60 * 1000,
        activeDuration: 5 * 60 * 1000,
    }));*/

})();