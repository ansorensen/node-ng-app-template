lifeWin.factory('authInterceptor', ['$rootScope', '$q', 'Session', function ($rootScope, $q, Session) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if (Session.token) {
                config.headers.Authorization = 'Bearer ' + Session.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
}]);

lifeWin.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});