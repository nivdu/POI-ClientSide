
    // window.location.href="#!/home"
    angular.module('myApp').controller('loginCtrl', function($http, $window, $scope, $rootScope) {
        $scope.checkDetails=function(user,passwd){
            var req = {
                method: "POST",
                url: 'http://localhost:3000/users/login',
                data: { username: user, password: passwd }
                }
                $http(req).then(function mySuccess(response) {
                    $rootScope.currUser=user;
                    $rootScope.token=response.data;
                    $window.location.href = "#!/logedIn"
                }, function myError(response) {
                    $scope.error= response.data;//todo
                });
        }
    });



// explore controller
// angular.module("myApp").controller("exploreCtrl", function ($scope, $http) {
//     $http({
//         method : "GET",
//         url : "http://localhost:3000/poi/GetThreeRandomPopularPOI/-1"
//     }).then(function success(response){
//         $scope.pois=response.data;
//     }, function myError(response){
        
//     });
// });
