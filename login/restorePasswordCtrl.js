
angular.module("myApp").controller("restorePasswordCtrl", function ($window, $scope, $http, $rootScope) {
    
var number = 0;
// var token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibml2ZHVkIiwiaWF0IjoxNTYwNDU3NzY2LCJleHAiOjE1NjA1NDQxNjZ9.WrziwsOwN_WC38prHFLU3NjrcGfoqzQhjV0ZAMSIsGY';
    $http({
        method : "POST",
        url : "http://localhost:3000/users/GetVarificationQuestionOfUser",
        // headers : {
        //     'x-auth-token': token
        // }
        data:{name: $rootScope.restoreUserName},
    }).then(function success(response){
        $scope.questions=response.data;
    }, function myError(response){
        $scope.questions=response.statuseText;
    })

    $scope.checkRestore=function(ansFirst,ansSecond){
        // var token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibml2ZHVkIiwiaWF0IjoxNTYwNDU3NzY2LCJleHAiOjE1NjA1NDQxNjZ9.WrziwsOwN_WC38prHFLU3NjrcGfoqzQhjV0ZAMSIsGY';
            $http({
                method : "POST",
                url : "http://localhost:3000/users/RestorePassword",
                // headers : {
                    // 'x-auth-token': token
                // },
                data: { ansDesc1: ansFirst, ansDesc2: ansSecond, username: $rootScope.restoreUserName, questID1: $scope.questions[0].questID, questID2:$scope.questions[1].questID}
            }).then(function success(response){
                $scope.password = response.data;
                $window.alert("Your password is:" + $scope.password[0].passwd)
                $window.location.href = "#!/login"
            }, function myError(response){
                $scope.alertRes = response.data;
                // $scope.questions=response.statuseText;
        }); 
    }
});