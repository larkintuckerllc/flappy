angular.module('myApp').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/', {
      	  		templateUrl: 'views/index-home.html',
       			controller: 'IndexHomeCtrl'
      		}).
      		otherwise({
       			redirectTo: '/'
      		});
}]);
