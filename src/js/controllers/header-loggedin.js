app.controller('header-loggedin', [
    '$scope', '$state', 'AuthService', function($scope, $state, AuthService) {

        $scope.logout = function() {
            AuthService.logout();
            $state.go('loggedout.home')
        };

    }]);