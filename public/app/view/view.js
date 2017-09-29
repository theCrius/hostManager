'use strict';

angular.module('hm.properties.view', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/view/:uuid', {
    templateUrl: 'view/view.html',
    controller: 'ViewCtrl'
  });
}])

.controller('ViewCtrl', ViewCtrl);

function ViewCtrl($scope, $location, $http, $routeParams) {
  init();

  function init() {
    $http({method: 'GET', url: 'http://localhost:4000/properties/'+$routeParams.uuid})
    .then(function(response) {
      $scope.propertyHistory = response.data;
      $scope.propertyCurrent = response.data[0];
    }, function(response) {
      $scope.error = response;
    });
  }

  $scope.updateProperty = function() {
    $http({method: 'PUT', url: 'http://localhost:4000/properties/', headers: {'Content-Type': "application/json"}, data: $scope.propertyCurrent})
    .then(function(response) {
      $scope.propertyHistory.unshift(response.data);
      $scope.propertyCurrent = response.data;
    }, function(response) {
      $scope.error = response;
    });
  }

  $scope.back = function(){
    $location.path( "/properties" );
  }
}
