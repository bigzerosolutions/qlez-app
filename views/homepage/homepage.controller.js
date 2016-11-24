(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$location'];
    function HomeController($rootScope, $location){
        
        //console.log("Application has been Started : Welcome Page Loaded")
        var vm = this;
        vm.login = login;
        vm.salesWelcome = salesWelcome;
        $rootScope.menu = {
            'display' : "none"
        };

        function login(){
            $location.path('/login');
        };

        function salesWelcome(){
            $location.path('/salesWelcome');
        };

    }
})();