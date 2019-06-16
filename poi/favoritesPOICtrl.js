
angular.module("myApp").controller("favoritesPOICtrl", function ($scope, $http, $window, $rootScope) {
    $scope.orderByField = 'name';
    $scope.reverseSort = false;
    
    $http({
        method : "POST",
        url : "http://localhost:3000/private/poi/GetSavedPOIOfUser",
        headers : {
            'x-auth-token': $rootScope.token
        }
    }).then(function success(response){
        $scope.allPOIs=response.data;
    }, function myError(response){
        
    });

    $scope.showSingle=function(singlePOI){
        $rootScope.SinglepoinumberOfViews=singlePOI.numberOfViews;
        $rootScope.SinglepoiDescription=singlePOI.poiDescription;
        $rootScope.Singlepoirank=singlePOI.rank;
        $rootScope.SinglepoiID=singlePOI.poiID;
        $rootScope.SinglepoiName=singlePOI.name;
        $rootScope.SinglepoiCategoryName=singlePOI.CategoryName;
        $rootScope.SinglepoiImage=singlePOI.poiImage;
        $window.location.href = "#!/singlePOIWindow";
    }
});

