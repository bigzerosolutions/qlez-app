(function() {
    'use strict';
    angular
        .module('app')
        .controller('customerActions', customerActions);

    customerActions.$inject = ['$rootScope', '$location', '$timeout','$scope','$http'];

    function customerActions($rootScope, $location, $timeout,$scope,$http) {
        console.log("User customerActions controller has been initiated");
        
        
        $rootScope.globals.currentUser.currentPage = "customer";
        $rootScope.currentPage();
        
        $scope.InvoiceStaff = $rootScope.globals.currentUser.username;
        var customers = [];
        var customer = {};
        var searchText = '';
        var onEdit = null;
        $scope.isLoading = "Loading...."; 
        $scope.filterCards = filterCards;
        $scope.onEdit = onEdit;
        $scope.searchText = searchText;
        $scope.customers = customers;
        $scope.customer = customer;
        $scope.getCustomers = getCustomers;
        $scope.editCustomer = editCustomer;
        $scope.saveCustomers = saveCustomers;
        $scope.deleteCustomers = deleteCustomers;
        //$scope.customerService = customerService;

        function getCustomers() {
          console.log($scope.customer);
            $scope.customer.action = "fetchAll";
            $http.post('/customerActions',$scope.customer).success(function(response)
            {
                console.log(response);
                if(response == "fail")
                {
                    // When the customer is not register
                   
                    $timeout(function () 
                    {
                       //$route.reload();
                       $scope.isLoading = null; 
                    }, 2000);
                    $scope.user = "Guest";
                    $scope.isLoading = "Error in fetching customers!";
                }
                else if(response == "connection_error")
                {
                    // when the service connection was not successful
                    $scope.isLoading = "Error in fetching customers!";
                    swal({title: "Connection Error!",   text: "Connection could not be established! Please Refresh",   type: "error",   confirmButtonText: "ok" });
                    swal.close();
                }
                else
                {
                    $scope.isLoading = null;
                    $scope.customers =response;
                }
                console.log($scope.customers);
                //$rootScope.globals.currentUser.customerName= $scope.user;
        });
            
        }
        getCustomers();

        function filterCards(cost) {
            //console.log("ddsd");
            var flag1 = false;
            console.log($scope.searchText);
            if ($scope.searchText != undefined && $scope.searchText != null && $scope.searchText != '') {
                if ((cost.customer_Name != null && cost.customer_Name.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) ||
                    (cost.customer_ID != null && cost.customer_ID.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)) {
                    flag1 = true;
                }
            } else {
                flag1 = true;
            }
            return flag1;
        }

        function editCustomer(customerId) {
            for (var i = 0; i < $scope.customers.length; i++) {
                if ($scope.customers[i].customer_ID == customerId) {
                    $scope.onEdit = customerId;
                }
            }
        };

        function saveCustomers(customerId) {
          
            $scope.editCustomerValues =  {
                "action": "edit",
                "cAddress": $scope.customer.customerAddress,
                "cContact": $scope.customer.customerContact,
                "cDOB": $scope.customer.customerDOB,
                "cEmail": $scope.customer.customerEmail,
                "cID":customerId,
                "cName":$scope.customer.customerName
                };
            $scope.customer.action = "edit";
            $http.post('/customerActions',$scope.editCustomerValues).success(function(response)
            {
            console.log("New Customer ID : Response from the server : " + response);
                if(response == '"fail"' || response == '"junk data"')
                {
                    console.log("Edit Customer : No ID has been detected");
                    swal({title: "Not edited!",   text: "Please retry",   type: "error",   confirmButtonText: "ok" },
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
                    console.log("Edit Customer : Customer has been edited");
                    for (var i = 0; i < $scope.customers.length; i++) {
                if ($scope.customers[i].Id == customerId) {
                    $scope.customers[i].Name = $scope.customerName;
                    $scope.customers[i].City = $scope.customerCity;
                }
            }
            $scope.onEdit = null;
                    
                }
        });
        };

        function deleteCustomers(customerId) {
          
           //console.log($scope.customer);
             $scope.deleteCustomerValues =  {
                "action": "delete",
                "cID":customerId
                };
            $http.post('/customerActions',$scope.deleteCustomerValues).success(function(response)
            {
            console.log("Delete Customer : Response from the server : " + response);
                if(response == '"fail"' || response == '"junk data"')
                {
                    console.log("New Customer ID : No ID has been detected");
                    swal({title: "Not deleted!",   text: "Please retry",   type: "error",   confirmButtonText: "ok" },
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
                    console.log("Delete Customer : Customer has been deleted");
                    for(var i = $scope.customers.length - 1; i >= 0; i--) {
                    if($scope.customers[i].Id === customerId) {
                        $scope.customers.splice(i, 1);
                    }
                    getCustomers();
            }                    
                }
        });
        };
    }
})();
