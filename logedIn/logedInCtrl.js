angular.module("myApp").controller("logedInCtrl", function ($window, $scope, $http, $rootScope) {
    $scope.FavPOIs = [];
    
    // $http({
    //     method : "POST",
    //     url : "http://localhost:3000/private/poi/GetSavedPOIOfUser",
    //     headers : {
    //         'x-auth-token': $rootScope.token
    //     }
    // }).then(function success(response){
    //     $window.sessionStorage.setItem("favoritesPOI",JSON.stringify(response.data));
    // }, function myError(response){
    //     $scope.error = response.data;
    // }),
    
    $http({
        method : "POST",
        url : "http://localhost:3000/private/poi/GetTwoPopularPOIByUserCategory",
        headers : {
            'x-auth-token': $rootScope.token
        }
    }).then(function success(response){
        $scope.recommendedPois=response.data;
    }, function myError(response){
        $scope.recommendedPois=response.data;
    }),

    $http({
        method : "POST",
        url : "http://localhost:3000/private/poi/GetLastTwoSavedPOI",
        headers : {
            'x-auth-token': $rootScope.token
        }
    }).then(function success(response){
        $scope.savedPois=response.data;
    }, function myError(response){
        $scope.savedPois=response.data;
    })

    $scope.showSingle=function(event){
        $http({
            method : "GET",
            url : "http://localhost:3000/poi/GetPOIDetails/" + event.target.id
        }).then(function success(response){
            $rootScope.Singlepoi=response.data.poiDetalis[0];
            $rootScope.SinglepoinumberOfViews=response.data.poiDetalis[0].numberOfViews;
            $rootScope.SinglepoiDescription=response.data.poiDetalis[0].poiDescription;
            $rootScope.Singlepoirank=response.data.poiDetalis[0].rank;
            $rootScope.SinglepoiID=response.data.poiDetalis[0].poiID;
            $rootScope.SinglepoiName=response.data.poiDetalis[0].name;
            $rootScope.SinglepoiCategoryName=response.data.poiDetalis[0].CategoryName;
            $rootScope.SinglepoiImage=response.data.poiDetalis[0].poiImage;
            if(response.data.poiLastReviews.length>=1){
                $rootScope.SinglepoiReview1 = response.data.poiLastReviews[0];
                $scope.review1 = true;
            }
            else{
                $scope.review1 = false;
            }
            if(response.data.poiLastReviews.length>=2){
                $scope.review2 = true;
                $rootScope.SinglepoiReview2 = response.data.poiLastReviews[1];
            }
            else{
                $scope.review2 = false;
            }
            // $window.location.href = "#!/singlePOIWindow";
        }, function myError(response){
            $rootScope.SinglepoiID=response.data.poiDetalis[0].poiID;
        });    
    }

    
});