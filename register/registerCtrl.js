angular.module("myApp").controller("registerCtrl", function ($scope, $http, $window, $rootScope) {
    $http({
        method : "GET",
        url : "http://localhost:3000/users/GetAllQuestions",
    }).then(function success(response){
        $scope.questions = response.data;
    }, function myError(response){
        $scope.error = response.statusText;
    }); 


    $http({
        method : "GET",
        url : "http://localhost:3000/categories/GetAllCategories",
    }).then(function success(response){
        $scope.categories = response.data;
    }, function myError(response){
        $scope.error = response.statusText;
    }); 
    
    $http({
        method : "GET",
        url : "http://localhost:3000/users/getAllCountries",
    }).then(function success(response){
        $scope.countries = response.data;
    }, function myError(response){
        $scope.error = response.statusText;
    }); 


    $scope.register = function(){
        var chosenCategories = [];
        for (i in $scope.selectedCategories) {
            chosenCategories.push({ "name": $scope.selectedCategories[i].CategoryName});
        }
        if(chosenCategories.length<2){
            alert("Please select at least two categories")
        }
        else{
            $http({
                method : "POST",
                url : "http://localhost:3000/users/register",
                data:{ 
                    username: $scope.usernameReg, 
                    password: $scope.passwordReg,
                    firstName:$scope.firstNameReg,
                    lastName: $scope.lastNameReg,
                    city: $scope.cityReg,
                    country:$scope.selectedCountry,
                    email:$scope.emailReg,
                    firstQuestionID: $scope.questions[0].questID,
                    secondQuestionID:$scope.questions[1].questID,
                    firstAnswer: $scope.firstAnsReg,
                    secondAnswer: $scope.secondAnsReg,
                    categories:chosenCategories
                }
            }).then(function success(response){
                alert("Registration succeed!");
                $window.location.href="#!/home";
            }, function myError(response){
                $scope.error = response.data;
            }); 
        }
    }
});