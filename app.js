let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/home', {
            // this is a template
            template: '<h1>This is the default route</h1>'
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller : 'loginCtrl as loginctrl'
        });
        // about
        // .when('/about', {
        //     // this is a template url
        //     templateUrl: 'pages/about/about.html',
        //     controller : 'aboutController as abtCtrl'
        // })
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
        // .otherwise({ redirectTo: '/home' });
}); 