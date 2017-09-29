'use strict';

angular.module('hm.properties.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/properties/list', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ListCtrl);

function ListCtrl($scope, $location, $http) {
  init();

  function init() {
    $http.get('http://localhost:4000/properties')
    .then(function(response) {
      $scope.propertyList = response.data;
    }, function(errorResponse) {
      $scope.error = errorResponse;
    });
  }

  $scope.deleteProperty = function(uuid) {
    $http.delete('http://localhost:4000/properties/'+uuid)
    .then(function(response) {
      $scope.propertyList = $scope.propertyList.filter(function( property ) {
        return property.uuid !== uuid;
      });
    }, function(errorResponse) {
      $scope.error = errorResponse;
    });
  }

  $scope.create = function() {
    $location.path( "/properties/create" );
  }
}
