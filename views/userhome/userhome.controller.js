(function () {
    'use strict';
    angular
        .module('app')
        .controller('UserHomeController', UserHomeController);

    UserHomeController.$inject = ['$rootScope','AuthenticationService', '$location','$timeout'];
    function UserHomeController($rootScope,AuthenticationService, $location,$timeout){
        console.log("User Home controller has been initiated");    
        var vm = this;
        $rootScope.menu = {
            'display' : "block"
        };
        
        $rootScope.globals.currentUser.currentPage = "home";
        $rootScope.currentPage();
        vm.addNewProduct = addNewProduct;
        vm.customerService = customerService;
        vm.completeDisplay = completeDisplay;
        vm.username = $rootScope.globals.currentUser.username;
        
        function completeDisplay(){
            $location.path('/completeDisplay');
        }

        function customerService(){
            $location.path('/customerHome');
        }
        
        function addNewProduct(){
            $location.path('/addNewProduct');
        };
    }
})();