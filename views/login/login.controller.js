(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','$scope','$http','AuthenticationService','$rootScope'];
    
    function LoginController($location,$scope,$http,AuthenticationService,$rootScope) {
        var vm = this;
        //console.log("Login controller has been initiated");    
        $rootScope.menu = {
            'display' : "none"
        };
        
        // For any earlier clearing Sessions
        AuthenticationService.ClearCredentials();
        
        $scope.login = function(){  
            //console.log("Login : Login function has been initiated")
            // Connecting to the server side for verification 
            $http.post('/loginAuth',$scope.vm).success(function(response){
                //console.log("Login : Response recieved from the server : "  + response);
                if(response == "true"){
                    console.log("Login : User is verified");
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    console.log("username : " +vm.username);
                    if(vm.username == "admin"){
                        $location.path('/setting');    
                        $rootScope.globals.currentUser.username = vm.username;
                    }
                    else{
                        $location.path('/userhome');   
                    }
                }
                else if(response == "false"){
                    console.log("Login : User is not verified");
                    swal({title: "Login Error!",   text: "Login Credentials are not valid",   type: "error",   confirmButtonText: "ok" });
                }
                else{
                    //When the connection was not successfull
                    swal({title: "Connection Error!",   text: "Connection could not be established",   type: "error",   confirmButtonText: "ok" });
                }
            }); 
        };

        $scope.changePassword = function(){
            $http.post('/changeUserPassword',{"userID": vm.userID}).success(function(response){ 

            });
        };  
    }
})();