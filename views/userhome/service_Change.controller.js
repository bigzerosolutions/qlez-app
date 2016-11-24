(function () {
    'use strict';
    angular
        .module('app')
        .controller('ServiceChangeController', ServiceChangeController);

    ServiceChangeController.$inject = ['$rootScope','$scope', '$location','$http'];
    
    function ServiceChangeController($rootScope,$scope, $location,$http){
        console.log("ServiceChangeController has been initiated");    
        $rootScope.menu = {
            'display' : "none"
        };
        $scope.user = $rootScope.globals.currentUser.username;
        var key = "no_Hardware";
        $scope.key =key;
        
        $scope.setEnv = function(Env){  
            if(Env=='Prod'){
                $scope.key = "Hardware";
            }
            //console.log("setEnv : setEnv function has been initiated with Env: "+ $scope.key)
            $http.post('/setEnv',{"Env_key": $scope.key}).success(function(response){   
                if(response == "true"){
                    var test = $location.path('/userhome');
                }
                else if(response == "false"){
                    console.log("Setting : Env is not set.");
                    swal({title: "Setting Error!",   text: "Connection issue.",   type: "error",   confirmButtonText: "ok" });
                }
                else{
                    //When the connection was not successfull
                    swal({title: "Connection Error!",   text: "Connection could not be established",   type: "error",   confirmButtonText: "ok" });
                }
            }); 
        };
    }
})();