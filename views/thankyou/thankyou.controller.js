(function () {
    'use strict';

    angular
        .module('app')
        .controller('thankyou', thankyou);

    thankyou.$inject = ['$rootScope','$http','$location','$timeout'];
    function thankyou($rootScope, $http,$location,$timeout) 
    {
        $rootScope.globals.currentUser.sessionEnd = new Date();
        console.log($rootScope.globals);
        /*$http.post('/SessionDetails',).success(function(response)
        {   
               
        } */   
        $timeout(function () {
            $location.path('/login');
        }, 3000);
           
    }
})();