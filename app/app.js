'use strict';

// Declare app level module which depends on views, and components I used cg Busy and ngScrollbar from git
var app = angular.module('myApp', [
  'ngRoute',
  'cgBusy',
  'ngScrollbar',
  'ngAnimate',
  'myApp.version'
]);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.
        when('/view1', {
          templateUrl: 'view1/view1.html',
          controller: 'MemberCtrl'
        }).
        when('/members2', {
          templateUrl: 'partials/members2.html',
          controller: 'MemberCtrl2'
        }).
        when('/dues', {
          templateUrl: 'partials/dues.html',
          controller: 'DueCtrl'
        }).
        when('/questions/:NIC', {
          templateUrl: 'partials/memProfile.html',
          controller: 'MemberProfileCtrl'
        }).
        when('/quizzes', {
          templateUrl: 'view3/quizzes.html',
          controller: 'QuizCtrl'

        })
        .
        when('/quiz_records', {
          templateUrl: 'partials/record.html',
          controller: 'RecordCtrl'

        })
      .when('/quizzes/:quizId', {
          templateUrl: 'view2/questions.html',
          controller: 'MemberCtrl'
        }).
        when('/dashboard', {
          templateUrl: 'partials/dashboard.html',
          controller: 'QuizCtrl'
        }).
        when('/profile', {
          templateUrl: 'partials/profile.html',
          controller: 'MemberProfileCtrl'
        }).
        when('/notifications', {
          templateUrl: 'partials/notifications.html',
          controller: 'NotificationsCtrl'

        }).
        otherwise({
          redirectTo: '/dashboard'
        });

}]);





