
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
                $http({
                    method : "POST",
                    url : "http://localhost:3000/private/poi/GetSavedPOIOfUser",
                    headers : {
                        'x-auth-token': $rootScope.token
                    }
                }).then(function success(response2){
                    $window.sessionStorage.setItem("favoritesPOI",JSON.stringify(response2.data));
                }, function myError(response2){
                    $scope.error = response2.data;
                });
                $window.location.href = "#!/logedIn"
            }, function myError(response) {
                $scope.error= response.data;
            });
    }
});