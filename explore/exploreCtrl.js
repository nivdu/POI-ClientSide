// explore controller
angular.module("myApp").controller("exploreCtrl", function ($scope, $rootScope, $window, $http) {
    $http({
        method : "GET",
        url : "http://localhost:3000/poi/GetThreeRandomPopularPOI/-1"
    }).then(function success(response){
        $scope.pois=response.data;
    }, function myError(response){
        
    });

    $scope.showSingle=function(singlePOI){
        $http({
            method : "GET",
            url : "http://localhost:3000/poi/GetPOIDetails/" + singlePOI.poiID
        }).then(function success(response){
            $rootScope.SinglepoinumberOfViews=response.data.poiDetalis[0].numberOfViews;
            $rootScope.SinglepoiDescription=response.data.poiDetalis[0].poiDescription;
            $rootScope.Singlepoirank=response.data.poiDetalis[0].rank;
            $rootScope.SinglepoiID=response.data.poiDetalis[0].poiID;
            $rootScope.SinglepoiName=response.data.poiDetalis[0].name;
            $rootScope.SinglepoiCategoryName=response.data.poiDetalis[0].CategoryName;
            $rootScope.SinglepoiImage=response.data.poiDetalis[0].poiImage;
            $window.location.href = "#!/singlePOIWindow";
        }, function myError(response){
            $rootScope.SinglepoiID=response.data.poiDetalis[0].poiID;
        });
        
    }


    
});
