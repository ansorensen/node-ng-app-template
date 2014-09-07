app.factory('AuthService', ['$rootScope', '$http', 'Session', 'AUTH_EVENTS', function($rootScope, $http, Session, AUTH_EVENTS) {
    var authService = {};

    authService.login = function (credentials) {
        return $http
            .post('http://localhost:3000/authenticate', credentials)
            .success(function (data, status, headers, config) {
                Session.create(data.token, data.user.id, data.user.role);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                return data.user;
            })
            .error(function(data, status, headers, config) {
                Session.destroy();
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            });
    };

    authService.logout = function() {
        Session.destroy();
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    };

    authService.isAuthenticated = function() {
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1)
    };

    return authService;
}]);