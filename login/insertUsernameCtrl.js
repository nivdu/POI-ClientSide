angular.module("myApp").controller("insertUsernameCtrl", function ($rootScope, $window, $scope) {
    $scope.getUserName=function(user){
    $rootScope.restoreUserName=user;
    $window.location.href = "#!/restPass"
}});
