'use strict';

angular.module('hm.properties.create', ['ngRoute', 'ngMessages'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/create', {
    templateUrl: 'create/create.html',
    controller: 'CreateCtrl'
  });
}])

.controller('CreateCtrl', CreateCtrl);

function CreateCtrl($scope, $location, $http, $routeParams) {

  $scope.createProperty = function() {
    $http.post('http://localhost:4000/properties/', $scope.propertyCurrent)
    .then(function(response) {
      $location.path( "/properties/view/"+response.data.uuid );
    }, function(errorResponse) {
      $scope.error = errorResponse;
    });
  }

  $scope.back = function(){
    $location.path( "/properties" );
  }
}
