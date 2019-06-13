let app = angular.module('myApp', ["ngRoute"]);

// config routes
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
        // about
        .when('/about', {
            // this is a template url
            // templateUrl: 'pages/about/about.html',
            // controller : 'aboutController as abtCtrl'
        })
        // // poi
        // .when('/poi', {
        //     templateUrl: 'pages/poi/poi.html',
        //     controller : 'poiController as poiCtrl'
        // })
        .when('/restPass', {
            templateUrl: 'login/restorePassword.html',
            controller : 'restorePasswordCtrl as restorePasswordCtrl'
        })
        // other
        .otherwise({ redirectTo: '/home' });
}); 

// var token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibml2ZHVkIiwiaWF0IjoxNTYwNDU3NzY2LCJleHAiOjE1NjA1NDQxNjZ9.WrziwsOwN_WC38prHFLU3NjrcGfoqzQhjV0ZAMSIsGY';