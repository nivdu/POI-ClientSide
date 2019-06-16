angular.module("myApp").controller("favoritesPOICtrl", function ($scope, $http, $window, $rootScope) {
    $scope.orderByField = 'CategoryName';
    $scope.reverseSort = false;
});
