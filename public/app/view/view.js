'use strict';

angular.module('hm.properties.view', ['ngRoute', 'ngMessages'])

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
    $http.get('http://localhost:4000/properties/'+$routeParams.uuid)
    .then(function(response) {
      $scope.propertyHistory = response.data;
      $scope.propertyCurrent = angular.copy(response.data[0]);
      console.log($scope.propertyHistory);
    }, function(errorResponse) {
      $scope.error = errorResponse;
    });
  }

  $scope.updateProperty = function() {
    $http.put('http://localhost:4000/properties/', $scope.propertyCurrent)
    .then(function(response) {
      $scope.propertyHistory.unshift(response.data);
      console.log($scope.propertyHistory);
    }, function(errorResponse) {
      $scope.error = errorResponse;
    });
  }

  $scope.back = function(){
    $location.path( "/properties" );
  }
}
