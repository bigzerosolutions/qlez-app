(function () {
    'use strict';

    angular
        .module('app')
        .controller('completeDisplay', completeDisplay);

    completeDisplay.$inject = ['$filter','$http', '$scope','$location','$timeout','$rootScope'];
    function completeDisplay($filter, $http, $scope,$location,$timeout,$rootScope) 
    {
        $scope.searchBy="productName";
        $scope.isLoading = "Loading Inventory...";
        
        $rootScope.globals.currentUser.currentPage = "stock";
        $rootScope.currentPage();
        
        $scope.filterProducts = function(inventoryItem)
        {
            var flag1 = false;
            $scope.searchBy = document.getElementById("searchBy").value;
            $scope.searchText = document.getElementById("searchText").value;
            if ($scope.searchText != undefined && $scope.searchText != null && $scope.searchText != '') 
            {
                if (($scope.searchBy=='productName') && (inventoryItem.pName != null && inventoryItem.pName.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)) 
                {
                    flag1 = true;
                }  else if (($scope.searchBy=='productID') && (inventoryItem.pID != null && inventoryItem.pID.toLowerCase().indexOf($scope.searchText.toLowerCase())!= -1) )
                {
                    flag1 = true;
                } else if (($scope.searchBy=='companyName') && (inventoryItem.pManufacturer != null && inventoryItem.pManufacturer.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1)) 
                {
                    flag1 = true;
                }
            }else 
                {
                    flag1 = true;
                }
            return flag1;
        }

        $scope.getAllInventoryItems = function()
        {
            $http.get('/getAllInventoryItems').success(function(response)
            {
                console.log("Stock Display : Response from Server" + response);
                if(response!=undefined && response.length!=0 )
                {
                    $scope.count = Object.keys(response).length;
                    $scope.allInventoryItem = response;
                    $scope.isLoading = null;
                }
                else
                {
                    $scope.isLoading = "Loading...";
                }
            });
        }
    }
})();