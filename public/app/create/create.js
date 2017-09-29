'use strict';

angular.module('hm.properties.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/create', {
    templateUrl: 'create/create.html',
    controller: 'CreateCtrl'
  });
}])

.controller('CreateCtrl', CreateCtrl);

function CreateCtrl($scope, $location, $http, $routeParams) {

  $scope.createProperty = function() {
    $http({method: 'POST', url: 'http://localhost:4000/properties/', headers: {'Content-Type': "application/json"}, data: $scope.propertyCurrent})
    .then(function(response) {
      $location.path( "/properties/view/"+response.data.uuid );
    }, function(response) {
      $scope.error = response;
    });
  }

  $scope.back = function(){
    $location.path( "/properties" );
  }
}
