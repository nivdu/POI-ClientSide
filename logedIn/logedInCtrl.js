angular.module("myApp").controller("logedInCtrl", function ($window, $scope, $http, $rootScope) {
    $rootScope.FavPOIs = [];
    
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
    })

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
    
});