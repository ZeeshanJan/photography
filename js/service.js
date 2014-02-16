var myApp = angular.module('myApp', ['ngRoute', 'angularFileUpload' ]);

myApp.config(['$routeProvider', '$locationProvider', function (routeProvider, locationProvider) {
    routeProvider.when('/admin', {
        templateUrl: 'admin.html',
        controller: 'CtrlAdmin'
    }).when('/contact', {
            templateUrl: 'contact.html',
            controller: 'CtrlContact'
        }).
        when('/about', {
            templateUrl: 'about.html',
            controller: 'CtrlAbout'
        }).
        when('/', {
            templateUrl: 'index.html',
            controller: 'CtrlSnapList'
        }).
        when('/index', {
            templateUrl: 'index.html',
            controller: 'CtrlSnapList'
        }).
        otherwise({
            redirectTo: '/index.html'});
    //locationProvider.html5Mode(true);

}]);

myApp.factory('SnapService', function ($http, $q) {
    var SnapService = {};

    SnapService.user = '';
    SnapService.isLogged = false;

    SnapService.getAllSnaps = function () {
        var deferred = $q.defer();
        //var url = 'getAllSnaps.json';
        var url = 'phpinc/getRes.php?req=getallsnaps';
        var status = [];
        var result = {};
        $http.get(url).
            success(function (dt, st) {
                result = dt;
                status = st;
                deferred.resolve(result);
            }).
            error(function (dt, st) {
                result = dt || "Request failed"; // dt = data; st = status;
                status = st;
            });
        return deferred.promise;

    }
    SnapService.addSnap = function (snap) {

    }
    SnapService.removeSnap = function (id) {

    }

    SnapService.loginUser = function (user, pass) {
        var deferred = $q.defer();
        //var url = 'getAllSnaps.json';
        var url = 'phpinc/getRes.php?req=login&user=' + user + '&pass=' + pass;
        var status = [];
        var result = {};
        $http.post(url).
            success(function (dt, st) {
                result = dt;
                status = st;
                deferred.resolve(result);
            }).
            error(function (dt, st) {
                result = dt || "Request failed"; // dt = data; st = status;
                status = st;
            });
        return deferred.promise;
    }

    SnapService.logoutUser = function () {
        return false;
    }

    SnapService.fetchAllAlbums = function () {
        var deferred = $q.defer();
        var url = 'phpinc/getRes.php?req=getallalbums';
        var status = [];
        var result = {};
        $http.get(url).
            success(function (dt, st) {
                result = dt;
                status = st;
                deferred.resolve(result);
            }).
            error(function (dt, st) {
                result = dt || "Request failed"; // dt = data; st = status;
                status = st;
            });
        return deferred.promise;
    }

    return SnapService;
});
/*

myApp.run(function ($rootScope, SnapService) {
    var lastDigestRun = new Date();
    $rootScope.$watch(function detectIdle() {
        var now = new Date();
        if (now - lastDigestRun > 10 * 60 * 60) {
            // logout here, like delete cookie, navigate to login ...
            SnapService.logoutUser()
        }
        lastDigestRun = now;
    });

});

*/

