// explore controller
angular.module("myApp").controller("exploreCtrl", function ($scope, $http) {
    $http({
        method : "GET",
        url : "http://localhost:3000/poi/GetThreeRandomPopularPOI/-1"
    }).then(function success(response){
        $scope.pois=response;
    }, function myError(response){
        
    });
});