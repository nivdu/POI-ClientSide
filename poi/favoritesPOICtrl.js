
angular.module("myApp").controller("favoritesPOICtrl", function ($scope, $http, $window, $rootScope) {
    $scope.orderByField = 'CategoryName';
    $scope.reverseSort = false;

    var arr = $window.sessionStorage.getItem("favoritesPOI"); 
    $scope.favors = arr?JSON.parse(arr):[];

});
