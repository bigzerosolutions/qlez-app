(function () {
    'use strict';
    angular
        .module('app')
        .controller('UserHomeController', UserHomeController);

    UserHomeController.$inject = ['$rootScope','AuthenticationService', '$location','$timeout'];
    function UserHomeController($rootScope,AuthenticationService, $location,$timeout){
        var vm = this;
        $rootScope.menu = $rootScope.action = {
            'display' : "block"
        };
        
        $rootScope.globals.currentUser.currentPage = "home";
        $rootScope.currentPage();
        
        vm.StockInventory = StockInventory;
        vm.CustomerService = CustomerService;
        vm.StockDisplay = StockDisplay;
        vm.username = $rootScope.globals.currentUser.username;
        
        function StockDisplay(){
            $location.path('/stock_display');
        }

        function CustomerService(){
            $location.path('/customer_home');
        }
        
        function StockInventory(){
            $location.path('/stock_inventory');
        };
    }
})();