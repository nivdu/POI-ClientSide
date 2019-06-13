
// explore controller
angular.module("myApp").controller("restorePasswordCtrl", function ($scope, $http) {
    
var number = 0;
var token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibml2ZHVkIiwiaWF0IjoxNTYwNDU3NzY2LCJleHAiOjE1NjA1NDQxNjZ9.WrziwsOwN_WC38prHFLU3NjrcGfoqzQhjV0ZAMSIsGY';
    $http({
        method : "POST",
        url : "http://localhost:3000/private/users/GetVarificationQuestionOfUser",
        headers : {
            'x-auth-token': token
        }
    }).then(function success(response){
        $scope.questions=response.data;
    }, function myError(response){
        $scope.questions=response.statuseText;
    });

    $scope.checkRestore=function(ansFirst,ansSecond){
        
    }
});
