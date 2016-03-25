/**
 * Created by hridhya on 3/22/16.
 */
angular.module('dex.services', [])

  .factory('Todos', function($http){

    return {
      createTodo: function (item) {
        return $http({
          method: 'POST',
          url: '/api/todos',
          data: item
        })
          .then(function (resp) {
            return resp;
          });

      }
    }

  });