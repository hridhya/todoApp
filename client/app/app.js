angular.module("dexRepo", [
  'dex.auth',
  'dex.home',
  'dex.services',
  'ui.router'
])
  .controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth){
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.currentUser = Auth.currentUser;
  $scope.logOut = Auth.logOut;
  }])

  .config(function($urlRouterProvider, $stateProvider){

    $urlRouterProvider
      .otherwise('/api/users/login');

    $stateProvider
      .state('home',{
        url:'/api/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('login',{
        url: '/api/users/login',
        controller: 'AuthCtrl',
        templateUrl: 'app/auth/signin.html',
        onEnter: ['$state', 'Auth', function($state, Auth){
          if(Auth.isLoggedIn()){
            $state.go('home');
          }
        }]
      })
      .state('signup',{
        url: '/api/users/signup',
        controller: 'AuthCtrl',
        templateUrl: 'app/auth/signup.html',
        onEnter: ['$state', 'Auth', function($state, Auth){
          if(Auth.isLoggedIn()){
            $state.go('home');
          }
        }]
      })

  });
