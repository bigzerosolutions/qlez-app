(function() {
    'use strict';
    angular
        .module('app')
        .controller('CustomerRegistrationController', CustomerRegistrationController);

    CustomerRegistrationController.$inject = ['$rootScope', '$location', '$timeout','$scope','$http','$route'];

    function CustomerRegistrationController($rootScope, $location, $timeout,$scope,$http,$route) 
    {

        $rootScope.globals.currentUser.currentPage = "customer";
        $rootScope.currentPage();
        
         $scope.example = {
         value: new Date(2016, 3, 22),
         currentDate: new Date(2007, 1, 1)
       };

        $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
    
       $scope.action = "Customer Registration";

       $scope.onlyCharactor = function($event)
       {
        var code = $event.keyCode;
        if((code>=97 && code <=122)||(code>=65 && code <=90)|| code==32){}
            else{
            
           
                $event.preventDefault();
            }
            
       }
        //console.log("Customer Registration controller has been initiated");
        var isLoading = "Loading....";
        $scope.isLoading = isLoading;

        $scope.InvoiceStaff = $rootScope.globals.currentUser.username;
        //console.log("New Customer ID : Single ID Fetching");

        $scope.noDecimal = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
            $event.preventDefault();
        }
        var value=document.getElementById("customerContact").value;       
       if(!isNaN(String.fromCharCode($event.keyCode))){
            var chars= value.split('');
            if(chars.length >=10){
                $event.preventDefault();
            }
            }
    };
        //Getting a new customer id to insert a single record to db

        $http.post('/getSinglePID',$scope.product).success(function(response)
        {
            //console.log("New Customer ID : Response from the server : " + response);
                if(response == '"fail"' || response == '"junk data"')
                {
                    //console.log("New Customer ID : No ID has been detected");
                    swal({title: "No ID detected!",   text: "Please retry",   type: "error",   confirmButtonText: "ok" },
                        function()
                        {
                            /*$route.reload();*/
                        });
                }
                else if(response == '"connection_error"')
                {
                    $scope.isLoading = null;
                    swal({title: "Connection Error!",   text: "Connection could not be established",   type: "error",   confirmButtonText: "ok" });
                }
                else
                {
                   // console.log("New Customer ID : ID has been detected");
                    $scope.customer.cID = response;
                    $scope.isLoading = null;
                    
                }
        });
        
        $scope.customerformSubmit = function()
        {
            //console.log($scope.customer);
            $scope.customer.action = "register";
            $http.post('/customerActions',$scope.customer).success(function(response)
            {
                if(response == "true")
                {
                    swal({   title: "Success!",   text:"New Customer has been added successfully" ,   type: "info",   confirmButtonText: "ok" });
                   $location.path('/customerHome');
                }
                else
                {
                    swal({   title: "Failed!",   text:"Failed to add New Customer" ,   type: "info",   confirmButtonText: "ok" });
                }
            });
        }

        

    }
})();
