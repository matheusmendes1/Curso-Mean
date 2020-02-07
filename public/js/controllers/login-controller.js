angular
    .module('alurapic')
    .controller('LoginController', function($scope, $http) {

        $scope.usuario = {};
        $scope.mensagem = '';

        $scope.autenticar = () => {

            let usuario = $scope.usuario;

            $http
                .post('/autenticar', { login: usuario.login, senha: usuario.senha})
                .then( () => {
                    $location.path('/');
                },
                (error) => {
                    console.log(error);
                    $scope.mensagem = 'Login ou senha inválidos';
                })
        };
    });