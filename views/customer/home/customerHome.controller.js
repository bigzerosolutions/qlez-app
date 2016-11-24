(function () {
    'use strict';
    angular
        .module('app')
        .controller('customerHomeController', customerHomeController);

    customerHomeController.$inject = ['$rootScope', '$location','$timeout'];
    function customerHomeController($rootScope, $location,$timeout) 
    {
        console.log("User customer home controller has been initiated");   
        var vm = this;
        $rootScope.globals.currentUser.currentPage = "customer";
        $rootScope.currentPage();

        $rootScope.globals.currentUser.currentPage = "customerHome";
        vm.customerRegistration = customerRegistration;
        vm.customerDeregistration = customerDeregistration;
        vm.username = $rootScope.globals.currentUser.username;
        
        function customerRegistration()
        {
            $location.path('/customerRegistration');
        }
        
        function customerDeregistration() 
        {
            $location.path('/customerActions');
        };
        
    }
})();