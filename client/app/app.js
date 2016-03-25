angular.module("dexRepo", [
  'dex.home',
  'dex.services',
  'ui.router'
])
  .config(function($urlRouterProvider, $stateProvider){

    $urlRouterProvider
      .otherwise('/api/home');

    $stateProvider
      .state('home',{
        url:'/api/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })

  });
