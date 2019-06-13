let app = angular.module('myApp', ["ngRoute"]);
// var currUser="guest";
// config routes

app.run(function ($rootScope) {
    $rootScope.rUsername = "guest";
 });

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
            // templateUrl: 'pages/about/about.html',
            // controller : 'aboutController as abtCtrl'
        })
        .when('/logedIn', {
            templateUrl: 'logedIn/logedIn.html',
            // this is a template url
            // templateUrl: 'pages/about/about.html',
            // controller : 'aboutController as abtCtrl'
        })
        // // poi
        // .when('/poi', {
        //     templateUrl: 'pages/poi/poi.html',
        //     controller : 'poiController as poiCtrl'
        // })
        // .when('/httpRequest', {
        //     templateUrl: 'pages/http/request.html',
        //     controller : 'httpController as httpCtrl'
        // })
        // other
        .otherwise({ redirectTo: '/home' });


}); 

