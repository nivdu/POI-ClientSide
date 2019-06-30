let app = angular.module('myApp', ["ngRoute"]);
// var currUser="guest";
// config routes

// app.run(function ($rootScope) {
//     $rootScope.rUsername = "guest";
//  });

app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/home', {
            templateUrl: 'home/home.html',
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller : 'loginCtrl as loginctrl'
        })
        .when('/register', {
            templateUrl: 'register/register.html',
            // this is a template url
            // templateUrl: 'pages/about/about.html',
            // controller : 'aboutController as abtCtrl'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: '  about/about.html',
            // controller : 'aboutController as abtCtrl'
        })
        .when('/logedIn', {
            templateUrl: 'logedIn/logedIn.html',
            controller : 'logedInCtrl as logedInCtrl'
            // this is a template url
            // templateUrl: 'pages/about/about.html',
            // controller : 'aboutController as abtCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        .when('/sortByRank', {
            templateUrl: 'poi/poi.html',
            controller : 'sortByRank as sortByRank'
        })
        .when('/restPass', {
            templateUrl: 'login/restorePassword.html',
            controller : 'restorePasswordCtrl as restorePasswordCtrl'
        })
        .when('/insertUserName', {
            templateUrl: 'login/insertUserName.html',
            controller : 'insertUsernameCtrl as insertUsernameCtrl'
        })
        .when('/singlePOIWindow', {
            templateUrl: 'poi/singlePOIWindow.html',
            controller : 'singlePOIWindowCtrl as singlePOIWindowCtrl'
        })
        .when('/searchedPoi', {
            templateUrl: 'poi/searchedPOI.html',
            controller : 'searchedPOICtrl as searchedPOICtrl'
        })
        .when('/favoritesPOI', {
            templateUrl: 'poi/favoritesPOI.html',
            controller : 'favoritesPOICtrl as favoritesPOICtrl'
        })
        
        // other
         .otherwise({ redirectTo: '/home' });
}); 




// app.service("myService", function() {
//     this.isLoggedIn = function(){
//         if($rootScope.currUser!="guest"){
//             return true;
//         }
//         else{
//             return false;
//         }
//     }
// });


app.controller("mainCtrl", function($scope, $http, $rootScope, $window){
    $rootScope.currUser = "guest";
    $rootScope.token = "guest";

    $http({
        method : "GET",
        url : "http://localhost:3000/poi/GetThreeRandomPopularPOI/-1"
    }).then(function success(response){
        $scope.pois=response.data;
    }, function myError(response){
        
    });

    $scope.showSingle=function(singlePOI){
        $http({
            method : "GET",
            url : "http://localhost:3000/poi/GetPOIDetails/" + singlePOI.poiID
        }).then(function success(response){
            $rootScope.SinglepoinumberOfViews=response.data.poiDetalis[0].numberOfViews;
            $rootScope.SinglepoiDescription=response.data.poiDetalis[0].poiDescription;
            $rootScope.Singlepoirank=response.data.poiDetalis[0].rank;
            $rootScope.SinglepoiID=response.data.poiDetalis[0].poiID;
            $rootScope.SinglepoiName=response.data.poiDetalis[0].name;
            $rootScope.SinglepoiCategoryName=response.data.poiDetalis[0].CategoryName;
            $rootScope.SinglepoiImage=response.data.poiDetalis[0].poiImage;
            $window.location.href = "#!/singlePOIWindow";
        }, function myError(response){
            $rootScope.SinglepoiID=response.data.poiDetalis[0].poiID;
        });    
    }

    $scope.isLoggedIn = function()
    {
        if($rootScope.currUser!="guest"){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.logout = function(){
        $rootScope.currUser = "guest";
        $rootScope.token = "guest";
        $window.sessionStorage.removeItem("favoritesPOI")
    }
})





