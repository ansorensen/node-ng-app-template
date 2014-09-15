app.controller('home-loggedout', [
    '$scope', '$state', 'AuthService', function($scope, $state, AuthService) {

     $scope.credentials = {
         email: '',
         password: ''
     };
     $scope.login = function (credentials) {
         AuthService.login(credentials).then(function (user) {
                 $state.go('loggedin.userItems');
             }, function(error) {
                 $scope.error = error;
            }
         );
     };
}]);
