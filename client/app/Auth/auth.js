/**
 * Created by hridhya on 3/25/16.
 */
angular.module('dex.auth', [])
  .controller('AuthCtrl', ['$scope', '$state', 'Auth',function($scope,$state, Auth){

  $scope.user = {};

  $scope.register = function(){
    Auth.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

  $scope.logIn = function(){
    Auth.logIn($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    });
  };

}])

  .factory('Auth', ['$http', '$window', '$location', function($http, $window, $location){

    var Auth = {};

    Auth.saveToken = function (token){
      $window.localStorage['restaurant-token'] = token;
    };

    Auth.getToken = function (){
      return $window.localStorage['restaurant-token'];
    };

    Auth.isLoggedIn = function(){
      var token = Auth.getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    Auth.currentUser = function(){
      if(Auth.isLoggedIn()){
        var token = Auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload.username;
      }
    };

    Auth.register = function(user){
      return $http.post('/api/users/signup', user).success(function(data){
        Auth.saveToken(data.token);
      });
    };

    Auth.logIn = function(user){
      return $http.post('/api/users/login', user).success(function(data){
        Auth.saveToken(data.token);
      });
    };

    Auth.logOut = function(){
      $window.localStorage.removeItem('restaurant-token');
      $location.path('/api/users/login');
    };

    return Auth;
  }]);
