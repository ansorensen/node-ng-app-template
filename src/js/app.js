var lifeWin = angular.module('lifeWin', ['ui.router']);

lifeWin.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('loggedout', {
			abstract: true,
			views: {
				'header': { templateUrl: 'views/partials/header-loggedout.html' },
				'footer': { templateUrl: 'views/partials/footer.html' }
			}
		})
		.state('loggedout.home', {
			url:'/',
			views: {
				'@': {templateUrl: 'views/home-loggedout.html', controller: 'home-loggedout'}
			}
		})
		.state('loggedin', {
			abstract: true,
			views: {
				'header': { templateUrl: 'views/partials/header-loggedin.html', controller: 'header-loggedin'},
				'footer': { templateUrl: 'views/partials/footer.html' }
			}
		})
		.state('loggedin.objects', {
			url: '/objects',
			views: {
				'@': {templateUrl: 'views/objects.html'}
			}
		})
		.state('loggedin.newObject', {
			url: '/objects/new',
			views: {
				'@': {templateUrl: 'views/objects-new.html'}
			}
		})
});

lifeWin.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

lifeWin.constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    user: 'user',
    guest: 'guest'
});