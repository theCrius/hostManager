'use strict';

angular.module('hm', [
  'ngRoute',
  'hm.properties.list',
  'hm.properties.view',
  'hm.properties.create'
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/properties/list'});
}])
