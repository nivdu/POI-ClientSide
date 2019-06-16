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
        .when('/favoritesPOI', {
            templateUrl: 'poi/favoritesPOI.html',
            controller : 'favoritesPOICtrl as favoritesPOICtrl'
        })
        
        // other
        .otherwise({ redirectTo: '/home' });
}); 

// var token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibml2ZHVkIiwiaWF0IjoxNTYwNDU3NzY2LCJleHAiOjE1NjA1NDQxNjZ9.WrziwsOwN_WC38prHFLU3NjrcGfoqzQhjV0ZAMSIsGY';
