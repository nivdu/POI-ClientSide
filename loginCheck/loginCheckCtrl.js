function checkDetails(password, username) {
    // window.location.href="#!/home"
    var app = angular.module('myApp', []);
    app.controller('myCtrl', function($http, $window, $scope) {
        var req = {
            method: "POST",
            url: 'http://localhost:3000/private/users/login',
            data: { username: username, password: password }
            }
            $http(req).then(function mySuccess(response) {
                $window.location.href = "#!/home"
            }, function myError(response) {
                $window.location.href = "#!/home"
                
            });
});

}