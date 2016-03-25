/**
 * Created by hridhya on 3/22/16.
 */
angular.module('dex.home', [])
  .controller('HomeCtrl', function($scope, Todos, $http){

    $scope.formData = {};

    $scope.createTodo = function() {
      console.log($scope.formData.text);

      $scope.todos.push({text:$scope.formData.text});

      Todos.createTodo($scope.formData)
        .catch(function(error){
          console.log(error);
        })
        .then(function(){
        $scope.formData = {};
      })
    };

    $scope.deleteTodo = function(id) {
      $http.delete('/api/todos/' + id)
        .success(function(data) {
          $scope.todos = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $http.get('/api/todos')
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(error) {
        console.log(error);
      });

  });