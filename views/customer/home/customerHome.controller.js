(function () {
    'use strict';
    angular
        .module('app')
        .controller('CustomerHomeController', CustomerHomeController);

    CustomerHomeController.$inject = ['$rootScope', '$location','$timeout'];
    function CustomerHomeController($rootScope, $location,$timeout) 
    {
        //console.log("User customer home controller has been initiated");   
        var vm = this;
        $rootScope.globals.currentUser.currentPage = "customer";
        $rootScope.currentPage();

        $rootScope.globals.currentUser.currentPage = "customerHome";
        vm.CustomerRegistration = CustomerRegistration;
        vm.CustomerActions = CustomerActions;
        vm.username = $rootScope.globals.currentUser.username;
        
        function CustomerRegistration()
        {
            $location.path('/customer_registration');
        }
        
        function CustomerActions() 
        {
            $location.path('/customer_actions');
        };
        
    }
})();